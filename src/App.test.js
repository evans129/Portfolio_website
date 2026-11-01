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
