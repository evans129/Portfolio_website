"""Build ATS-friendly resume files from src/data/resume.json.

Outputs
  public/files/<Name>_Resume.pdf            1-page resume, no phone number (served by the website)
  public/files/<Name>_Resume_Detailed.pdf   2-page resume, no phone number (served by the website)
  public/files/*-page<N>.webp               page previews shown on the website's Resume page
  src/data/resume-files.json                manifest of the public PDFs and their preview images
  resume/private/*.docx|*.pdf               same two versions WITH phone number (git-ignored),
                                            only when --phone or RESUME_PHONE is provided

Layout rules (ATS-safe): single column, standard section headings, Calibri, real text only,
no tables, text boxes, images, icons, headers, or footers. Each variant is auto-fitted to its
page budget by trying progressively more compact (but >= 10 pt) layouts.

Requires Windows with Microsoft Word (PDF export) plus: pip install -r resume/requirements.txt
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import shutil
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

import pypdfium2 as pdfium
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
from docx.shared import Inches, Pt
from PIL import Image
from pypdf import PdfReader

RESUME_DIR = Path(__file__).resolve().parent
ROOT = RESUME_DIR.parent
DATA_FILE = ROOT / "src" / "data" / "resume.json"
MANIFEST_FILE = ROOT / "src" / "data" / "resume-files.json"
PUBLIC_DIR = ROOT / "public" / "files"
PRIVATE_DIR = RESUME_DIR / "private"

FONT = "Calibri"
EN_DASH = "\u2013"
BULLET_NUM_ID = 90
VARIANT_PAGES = {"one": 1, "two": 2}
PREVIEW_DPI = 150


@dataclass(frozen=True)
class Layout:
    body: float  # body font size in pt (never below 10 for readability)
    margin_x: float  # left/right margin in inches
    margin_y: float  # top/bottom margin in inches
    section_gap: float  # space before section headings in pt
    item_gap: float  # space after bullets in pt


LAYOUTS = [
    Layout(10.5, 0.5, 0.5, 8, 1.5),
    Layout(10.5, 0.5, 0.45, 6, 1),
    Layout(10.25, 0.5, 0.45, 5, 0.5),
    Layout(10, 0.5, 0.4, 4, 0),
]


def included(item: dict, variant: str) -> bool:
    return variant in item.get("variants", ["one", "two"])


def date_range(item: dict) -> str:
    return f"{item['start']} {EN_DASH} {item['end']}"


class ResumeDocument:
    def __init__(self, layout: Layout):
        self.layout = layout
        self.doc = Document()
        section = self.doc.sections[0]
        section.page_width, section.page_height = Inches(8.27), Inches(11.69)  # A4
        section.left_margin = section.right_margin = Inches(layout.margin_x)
        section.top_margin = section.bottom_margin = Inches(layout.margin_y)
        self.text_width = section.page_width - section.left_margin - section.right_margin
        self._setup_normal_style()
        self._setup_bullets()

    def _setup_normal_style(self) -> None:
        normal = self.doc.styles["Normal"]
        normal.font.size = Pt(self.layout.body)
        rpr = normal.element.get_or_add_rPr()
        rfonts = rpr.find(qn("w:rFonts"))
        if rfonts is None:
            rfonts = OxmlElement("w:rFonts")
            rpr.insert(0, rfonts)
        # Theme font attributes override explicit fonts, so drop them.
        for attr in ("w:asciiTheme", "w:hAnsiTheme", "w:eastAsiaTheme", "w:cstheme"):
            rfonts.attrib.pop(qn(attr), None)
        for attr in ("w:ascii", "w:hAnsi", "w:eastAsia", "w:cs"):
            rfonts.set(qn(attr), FONT)
        fmt = normal.paragraph_format
        fmt.space_before = Pt(0)
        fmt.space_after = Pt(0)
        fmt.line_spacing = 1.0

    def _setup_bullets(self) -> None:
        # A real Word list whose bullet glyph is U+2022 in Calibri, so PDF text extraction
        # yields a plain "•" instead of a Symbol-font private-use character.
        numbering = self.doc.part.numbering_part.element
        abstract = parse_xml(
            f'<w:abstractNum {nsdecls("w")} w:abstractNumId="{BULLET_NUM_ID}">'
            '<w:multiLevelType w:val="singleLevel"/>'
            '<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/>'
            '<w:lvlText w:val="\u2022"/><w:lvlJc w:val="left"/>'
            '<w:pPr><w:ind w:left="288" w:hanging="216"/></w:pPr>'
            f'<w:rPr><w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}" w:cs="{FONT}" w:hint="default"/></w:rPr>'
            "</w:lvl></w:abstractNum>"
        )
        first_num = numbering.find(qn("w:num"))
        if first_num is not None:
            first_num.addprevious(abstract)
        else:
            numbering.append(abstract)
        numbering.append(
            parse_xml(
                f'<w:num {nsdecls("w")} w:numId="{BULLET_NUM_ID}">'
                f'<w:abstractNumId w:val="{BULLET_NUM_ID}"/></w:num>'
            )
        )

    def paragraph(self, *, align=None, before=0.0, after=0.0, keep_next=False, right_tab=False):
        p = self.doc.add_paragraph()
        fmt = p.paragraph_format
        fmt.space_before = Pt(before)
        fmt.space_after = Pt(after)
        fmt.keep_with_next = keep_next
        if align is not None:
            p.alignment = align
        if right_tab:
            fmt.tab_stops.add_tab_stop(self.text_width, WD_TAB_ALIGNMENT.RIGHT)
        return p

    @staticmethod
    def run(p, text: str, *, bold=False, italic=False, size: float | None = None):
        r = p.add_run(text)
        r.bold = bold
        r.italic = italic
        if size:
            r.font.size = Pt(size)
        return r

    @staticmethod
    def link(p, url: str, text: str, size: float | None = None) -> None:
        r_id = p.part.relate_to(url, RT.HYPERLINK, is_external=True)
        hyperlink = OxmlElement("w:hyperlink")
        hyperlink.set(qn("r:id"), r_id)
        run = OxmlElement("w:r")
        rpr = OxmlElement("w:rPr")
        if size:
            for tag in ("w:sz", "w:szCs"):
                el = OxmlElement(tag)
                el.set(qn("w:val"), str(round(size * 2)))
                rpr.append(el)
        run.append(rpr)
        t = OxmlElement("w:t")
        t.set(qn("xml:space"), "preserve")
        t.text = text
        run.append(t)
        hyperlink.append(run)
        p._p.append(hyperlink)

    def heading(self, title: str) -> None:
        p = self.paragraph(before=self.layout.section_gap, after=2, keep_next=True)
        self.run(p, title.upper(), bold=True, size=self.layout.body + 1)
        borders = OxmlElement("w:pBdr")
        bottom = OxmlElement("w:bottom")
        for key, value in (("w:val", "single"), ("w:sz", "6"), ("w:space", "1"), ("w:color", "000000")):
            bottom.set(qn(key), value)
        borders.append(bottom)
        p._p.get_or_add_pPr().append(borders)

    def bullet(self):
        p = self.paragraph(after=self.layout.item_gap)
        num_pr = OxmlElement("w:numPr")
        ilvl = OxmlElement("w:ilvl")
        ilvl.set(qn("w:val"), "0")
        num_id = OxmlElement("w:numId")
        num_id.set(qn("w:val"), str(BULLET_NUM_ID))
        num_pr.append(ilvl)
        num_pr.append(num_id)
        p._p.get_or_add_pPr().append(num_pr)
        return p


def build_document(data: dict, variant: str, layout: Layout, phone: str | None) -> Document:
    rd = ResumeDocument(layout)
    basics = data["basics"]
    body = layout.body
    small = body - 0.5

    p = rd.paragraph(align=WD_ALIGN_PARAGRAPH.CENTER)
    rd.run(p, basics["name"], bold=True, size=20)
    p = rd.paragraph(align=WD_ALIGN_PARAGRAPH.CENTER, after=1)
    rd.run(p, basics["resumeHeadline"], size=body + 0.5)

    p = rd.paragraph(align=WD_ALIGN_PARAGRAPH.CENTER)
    contact = [f"{basics['location']} ({basics['relocation']})"]
    if phone:
        contact.append(phone)
    rd.run(p, " | ".join(contact) + " | ", size=small)
    rd.link(p, f"mailto:{basics['email']}", basics["email"], size=small)
    p = rd.paragraph(align=WD_ALIGN_PARAGRAPH.CENTER)
    for i, link in enumerate(l for l in basics["links"] if not l.get("website")):
        if i:
            rd.run(p, " | ", size=small)
        rd.link(p, link["url"], link["display"], size=small)

    rd.heading("Summary")
    rd.run(rd.paragraph(), basics["summary"])

    rd.heading("Skills")
    for category in data["skills"]:
        p = rd.paragraph(after=0.5)
        rd.run(p, f"{category['category']}: ", bold=True)
        rd.run(p, ", ".join(category["items"]))

    rd.heading("Work Experience")
    previous_company = None
    for job in data["experience"]:
        if job["company"] != previous_company:
            p = rd.paragraph(right_tab=True, keep_next=True, before=2 if previous_company else 0)
            rd.run(p, job["company"], bold=True, size=body + 0.5)
            rd.run(p, f"\t{job['location']}")
            role_gap = 0
        else:
            role_gap = 4
        for role in job["roles"]:
            p = rd.paragraph(right_tab=True, keep_next=True, before=role_gap)
            rd.run(p, role["title"], bold=True)
            rd.run(p, f"\t{date_range(role)}")
            role_gap = 0
        for group in job["groups"]:
            bullets = [b for b in group["bullets"] if included(b, variant)]
            if not bullets:
                continue
            # A sub-heading only helps when a role spans several products/teams.
            if len(job["groups"]) > 1:
                has_dates = bool(group.get("start"))
                p = rd.paragraph(before=2, after=0.5, keep_next=True, right_tab=has_dates)
                rd.run(p, group["name"], bold=True, italic=True)
                if group.get("context"):
                    rd.run(p, f" | {group['context']}", italic=True)
                if has_dates:
                    rd.run(p, f"\t{date_range(group)}", italic=True)
            for item in bullets:
                rd.run(rd.bullet(), item["text"])
        previous_company = job["company"]

    leadership = [item for item in data.get("leadership", []) if included(item, variant)]
    if leadership:
        rd.heading("Leadership" if variant == "one" else "Leadership and Mentorship")
        for item in leadership:
            rd.run(rd.bullet(), item["text"])

    awards = [item for item in data.get("awards", []) if included(item, variant)]
    if awards:
        rd.heading("Awards")
        for item in awards:
            rd.run(rd.bullet(), item["text"])

    projects = [item for item in data.get("projects", []) if included(item, "two")] if variant == "two" else []
    if projects:
        rd.heading("Projects")
        for project in projects:
            p = rd.bullet()
            rd.run(p, project["name"], bold=True)
            rd.run(p, f" ({project['tech']}): ", italic=True)
            rd.run(p, project["text"])

    rd.heading("Education")
    for school in data["education"]:
        p = rd.paragraph(right_tab=True, keep_next=True)
        rd.run(p, school["school"], bold=True)
        rd.run(p, f"\t{school['location']}")
        p = rd.paragraph(right_tab=True)
        detail = f"; {school['detail']}" if school.get("detail") else ""
        rd.run(p, f"{school['degree']}{detail}")
        rd.run(p, f"\t{date_range(school)}")

    props = rd.doc.core_properties
    now = dt.datetime.now(dt.timezone.utc).replace(tzinfo=None, microsecond=0)
    props.author = basics["name"]
    props.last_modified_by = basics["name"]
    props.title = f"{basics['name']} - Resume"
    props.subject = basics["resumeHeadline"]
    props.keywords = ", ".join(item for category in data["skills"][:3] for item in category["items"][:4])
    props.comments = ""
    props.category = "Resume"
    props.revision = 1
    props.created = now
    props.modified = now
    props.last_printed = now
    return rd.doc


class Word:
    """Minimal Word COM wrapper: page counting and PDF export without modifying the DOCX."""

    def __enter__(self):
        import pythoncom
        import win32com.client

        pythoncom.CoInitialize()
        self.app = win32com.client.DispatchEx("Word.Application")
        self.app.Visible = False
        self.app.DisplayAlerts = 0
        return self

    def __exit__(self, *exc):
        import pythoncom

        self.app.Quit()
        pythoncom.CoUninitialize()

    def _open(self, path: Path):
        return self.app.Documents.Open(str(path), False, True, False)  # ConfirmConversions, ReadOnly, AddToRecentFiles

    def page_count(self, docx: Path) -> int:
        doc = self._open(docx)
        try:
            return doc.ComputeStatistics(2)  # wdStatisticPages
        finally:
            doc.Close(0)

    def export_pdf(self, docx: Path, pdf: Path) -> None:
        doc = self._open(docx)
        try:
            # Positional: OutputFileName, ExportFormat=PDF, OpenAfterExport, OptimizeFor=Print, Range=All,
            # From, To, Item=DocumentContent, IncludeDocProps, KeepIRM, CreateBookmarks=Headings,
            # DocStructureTags (tagged PDF), BitmapMissingFonts, UseISO19005_1
            doc.ExportAsFixedFormat(str(pdf), 17, False, 0, 0, 1, 1, 0, True, True, 1, True, True, False)
        finally:
            doc.Close(0)


def render(data: dict, variant: str, phone: str | None, word: Word, workdir: Path) -> tuple[Path, Path, Layout, int]:
    budget = VARIANT_PAGES[variant]
    kind = "private" if phone else "public"
    docx = workdir / f"{variant}-{kind}.docx"
    for layout in LAYOUTS:
        build_document(data, variant, layout, phone).save(docx)
        pages = word.page_count(docx)
        if pages <= budget:
            break
    else:
        sys.exit(
            f"The {variant}-page resume needs {pages} pages even at the most compact layout. "
            f"Trim bullets in {DATA_FILE.relative_to(ROOT)} (use \"variants\": [\"two\"] to keep them out of the 1-page version)."
        )
    pdf = docx.with_suffix(".pdf")
    word.export_pdf(docx, pdf)
    pdf_pages = len(PdfReader(pdf).pages)
    if pdf_pages > budget:
        sys.exit(f"Exported {variant}-page PDF has {pdf_pages} pages; expected at most {budget}.")
    return docx, pdf, layout, pdf_pages


def render_previews(pdf: Path) -> list[Path]:
    """Render each page of a public PDF to a WebP image for the website's Resume page."""
    for stale in pdf.parent.glob(f"{pdf.stem}-page*.webp"):
        stale.unlink()
    document = pdfium.PdfDocument(str(pdf))
    try:
        images = []
        for index in range(len(document)):
            # Text pages need few gray levels; a 16-level palette with lossless WebP stays crisp at ~1/3 the size.
            image = document[index].render(scale=PREVIEW_DPI / 72).to_pil().convert("L")
            image = image.quantize(colors=16, dither=Image.Dither.NONE).convert("L")
            path = pdf.with_name(f"{pdf.stem}-page{index + 1}.webp")
            image.save(path, "WEBP", lossless=True, method=6)
            images.append(path)
        return images
    finally:
        document.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Build ATS-friendly resume PDFs/DOCX from src/data/resume.json")
    parser.add_argument(
        "--phone",
        default=os.environ.get("RESUME_PHONE"),
        help="Phone number for the private copies in resume/private (default: RESUME_PHONE env var). Never committed.",
    )
    parser.add_argument("--variant", choices=["one", "two", "all"], default="all")
    parser.add_argument("--print-text", action="store_true", help="Print the text an ATS would extract from each public PDF")
    args = parser.parse_args()

    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    stem = data["basics"]["name"].replace(" ", "_") + "_Resume"
    file_names = {"one": stem, "two": f"{stem}_Detailed"}
    variants = ["one", "two"] if args.variant == "all" else [args.variant]
    manifest = json.loads(MANIFEST_FILE.read_text(encoding="utf-8")) if MANIFEST_FILE.exists() else {}

    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp, Word() as word:
        for variant in variants:
            _, pdf, layout, pages = render(data, variant, None, word, Path(tmp))
            target = PUBLIC_DIR / f"{file_names[variant]}.pdf"
            shutil.copyfile(pdf, target)
            previews = render_previews(target)
            manifest[variant] = {"pdf": target.name, "pages": [p.name for p in previews]}
            print(f"[public]  {target.relative_to(ROOT)}  ({pages} page(s), {layout.body} pt, {len(previews)} preview(s))")
            if args.print_text:
                print("\n".join(page.extract_text() for page in PdfReader(target).pages))
                print("-" * 80)
            if args.phone:
                PRIVATE_DIR.mkdir(parents=True, exist_ok=True)
                docx, pdf, layout, pages = render(data, variant, args.phone, word, Path(tmp))
                for source, suffix in ((docx, ".docx"), (pdf, ".pdf")):
                    target = PRIVATE_DIR / f"{file_names[variant]}{suffix}"
                    shutil.copyfile(source, target)
                    print(f"[private] {target.relative_to(ROOT)}  ({pages} page(s), {layout.body} pt)")

    MANIFEST_FILE.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"[public]  {MANIFEST_FILE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
