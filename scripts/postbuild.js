// GitHub Pages has no single-page-app fallback, so deep links like /Portfolio_website/resume
// would 404. Copy the app shell to <route>/index.html for every client-side route (served with
// HTTP 200) and to 404.html so unknown paths still load the app and show its not-found page.
const fs = require("fs");
const path = require("path");

// Keep in sync with the <Route> paths in src/App.js.
const ROUTES = ["about", "project", "resume", "contact"];

const buildDir = path.join(__dirname, "..", "build");
const shell = path.join(buildDir, "index.html");

if (!fs.existsSync(shell)) {
  console.error(`postbuild: ${shell} not found; run "npm run build" first.`);
  process.exit(1);
}

for (const route of ROUTES) {
  const dir = path.join(buildDir, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(shell, path.join(dir, "index.html"));
}
fs.copyFileSync(shell, path.join(buildDir, "404.html"));

console.log(`postbuild: wrote ${ROUTES.length} route pages and 404.html`);
