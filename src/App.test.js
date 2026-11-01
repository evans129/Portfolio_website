import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import resume from "./data/resume.json";

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test("home page shows the headline and impact highlights", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { level: 1, name: resume.basics.headline })).toBeInTheDocument();
  resume.highlights.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("resume page links to both PDF versions", () => {
  renderAt("/resume");
  const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
  expect(hrefs).toEqual(
    expect.arrayContaining([
      expect.stringMatching(/\/files\/Devansh_Kumar_Resume\.pdf$/),
      expect.stringMatching(/\/files\/Devansh_Kumar_Resume_Detailed\.pdf$/),
    ])
  );
});

test("about page renders every experience group", () => {
  renderAt("/about");
  resume.experience
    .flatMap((job) => job.groups)
    .forEach(({ name }) => expect(screen.getByRole("heading", { name })).toBeInTheDocument());
});

test("unknown routes render the not-found page", () => {
  renderAt("/does-not-exist");
  expect(screen.getByRole("heading", { level: 1, name: "404" })).toBeInTheDocument();
});

test("public resume data never contains a phone number", () => {
  expect(JSON.stringify(resume)).not.toMatch(/\+?\d[\d ()-]{8,}\d/);
});

const EMAIL_ADDRESS = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

test("public resume data never contains an email address or a LeetCode link", () => {
  const data = JSON.stringify(resume);
  expect(data).not.toMatch(EMAIL_ADDRESS);
  expect(data).not.toMatch(/leetcode/i);
});

test("no page shows an email address or a LeetCode link", () => {
  ["/", "/about", "/project", "/resume", "/contact"].forEach((path) => {
    const { container, unmount } = renderAt(path);
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") || "");
    expect(hrefs.filter((href) => href.startsWith("mailto:") || /leetcode/i.test(href))).toEqual([]);
    expect(container.textContent).not.toMatch(EMAIL_ADDRESS);
    unmount();
  });
});

test("contact page links to LinkedIn and GitHub", () => {
  renderAt("/contact");
  const profile = (label) => resume.basics.links.find((link) => link.label === label).url;
  const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
  expect(hrefs).toEqual(expect.arrayContaining([profile("LinkedIn"), profile("GitHub")]));
});
