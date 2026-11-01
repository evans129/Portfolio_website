# Portfolio Website

Personal portfolio of **Devansh Kumar**, Software Engineer II at Microsoft.

**Live site:** https://evans129.github.io/Portfolio_website/

Built with React (Create React App) and React Router, with EmailJS for the contact form. It's deployed to GitHub Pages by GitHub Actions.

## Project structure

| Path | What it is |
| --- | --- |
| `src/data/resume.json` | **Single source of truth** for experience, skills, education, and highlights. The website and the resume PDFs are both generated from it. |
| `src/data/resume-files.json` | Generated manifest of the public resume PDFs and their page previews. |
| `src/components/`, `src/routes/` | React components and pages (Home, About, Projects, Resume, Contact, 404). |
| `src/components/WorkCardData.js` | Project cards shown on the Projects page. |
| `public/files/` | Generated public resume PDFs and WebP page previews. |
| `resume/build_resume.py` | Generates the ATS-friendly resumes (DOCX, PDF, and previews) from `resume.json`. |
| `scripts/postbuild.js` | Makes deep links work on GitHub Pages (see [Deployment](#deployment)). |
| `.github/workflows/deploy.yml` | CI: test, build, and deploy to GitHub Pages. |

## Local development

```bash
npm ci
npm start          # dev server at http://localhost:3000/Portfolio_website
npm test           # unit tests (Jest + Testing Library)
npm run build      # production build in build/
```

## Updating the resume

1. Edit `src/data/resume.json`. Each bullet can include `"variants": ["one"]` or `["two"]` to appear only in the 1-page or 2-page resume. If omitted, it appears in both. The website shows the 2-page (`"two"`) bullets.
2. Regenerate the files (Windows + Microsoft Word required for the PDF export):

   ```powershell
   pip install -r resume/requirements.txt
   npm run resume
   ```

   This writes `public/files/Devansh_Kumar_Resume.pdf` (1 page) and `public/files/Devansh_Kumar_Resume_Detailed.pdf` (2 pages), their page previews, and `src/data/resume-files.json`. Each version is auto-fitted to its page budget (body text never below 10 pt). The build fails with a message if the content doesn't fit.
3. **Private copies with a phone number** (for job applications) are only generated when you pass the number at run time. They're written to `resume/private/`, which is git-ignored:

   ```powershell
   $env:RESUME_PHONE = "<your phone number>"; npm run resume
   ```

   Never put the phone number in `resume.json`. A unit test fails if the public data contains one.
4. Run `python resume/build_resume.py --print-text` to see the plain text an applicant tracking system (ATS) would extract.

The resume layout follows common ATS guidance:

- One column, with standard section headings (Summary, Skills, Work Experience, Education)
- Calibri font with contact details in the body rather than a header or footer
- No tables, text boxes, icons, or images
- Real, selectable text exported as a tagged PDF

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which runs the tests, builds the site, and deploys `build/` to GitHub Pages. Pull requests run the tests and build only.

One-time repository settings:

1. The repository must be **public**, or the account must have GitHub Pro, because GitHub Pages doesn't serve private repositories on free plans.
2. **Settings > Pages > Build and deployment > Source: GitHub Actions**.

GitHub Pages has no fallback for single-page apps. `scripts/postbuild.js` copies the app shell to `<route>/index.html` for every route (so deep links like `/resume` return HTTP 200) and to `404.html` for unknown paths. If you add a route to `src/App.js`, add it to the `ROUTES` list in that script too.
