// Generates public/projects/<slug>/index.html for every project in public/js/data.js,
// and removes folders for projects that no longer exist.
// Run with:  npm run pages
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..", "public");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js", "data.js"), "utf8"), sandbox);
const { projects } = sandbox.window.SITE_DATA;

const shell = (p) => `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${p.title.replace(/</g, "&lt;")} — Jubin</title>
  <meta name="description" content="${p.summary.replace(/"/g, "&quot;")}" />
  <meta name="theme-color" content="#0869aa" />
  <link rel="icon" href="/img/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
  <link rel="stylesheet" href="/css/style.css" />
  <script>document.documentElement.classList.add("js");</script>
</head>
<body>
  <a class="skip-link" href="#detail">본문으로 바로가기</a>
  <header class="site-header" id="siteHeader">
    <div class="header-inner">
      <a class="logo" href="/">jubin<span>.</span></a>
      <nav class="nav-pill" aria-label="주요 메뉴">
        <a href="/#work">Work</a><a href="/#about">About</a><a href="/#process">Process</a><a href="/#contact">Contact</a>
      </nav>
      <a class="btn-talk" href="/#contact">Let’s talk <span aria-hidden="true">↗</span></a>
      <button class="menu-btn" id="menuOpen" aria-label="메뉴 열기" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span></button>
    </div>
  </header>
  <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="메뉴" hidden>
    <div class="mobile-menu-top">
      <a class="logo" href="/">jubin<span>.</span></a>
      <button class="menu-close" id="menuClose" aria-label="메뉴 닫기">✕</button>
    </div>
    <nav aria-label="모바일 메뉴">
      <a href="/#work">Work</a><a href="/#about">About</a><a href="/#process">Process</a><a href="/#contact">Contact</a>
    </nav>
  </div>
  <main id="detail"></main>
  <footer class="footer container">
    <div class="footer-top">
      <div><strong class="footer-name" id="footerName"></strong><p class="footer-role" id="footerRole"></p></div>
      <ul class="footer-links" id="footerLinks"></ul>
    </div>
    <div class="footer-bottom"><span id="copyright"></span><a href="#detail" class="to-top">Back to top ↑</a></div>
  </footer>
  <script src="/js/data.js"></script>
  <script src="/js/common.js"></script>
  <script src="/js/project.js"></script>
</body>
</html>
`;

const outDir = path.join(ROOT, "projects");
fs.mkdirSync(outDir, { recursive: true });
const slugs = new Set(projects.map((p) => p.slug));
for (const name of fs.readdirSync(outDir)) {
  if (!slugs.has(name)) fs.rmSync(path.join(outDir, name), { recursive: true, force: true });
}
for (const p of projects) {
  fs.mkdirSync(path.join(outDir, p.slug), { recursive: true });
  fs.writeFileSync(path.join(outDir, p.slug, "index.html"), shell(p));
}
console.log(`Generated ${projects.length} project pages: ${[...slugs].join(", ")}`);
