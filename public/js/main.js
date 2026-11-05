(function () {
  const d = window.SITE_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ext = (url) => (/^https?:\/\//.test(url) ? ' target="_blank" rel="noopener"' : "");
  const linkHtml = (l, cls = "") => `<a class="${cls}" href="${esc(l.url)}"${ext(l.url)}>${esc(l.label)} ↗</a>`;

  const p = d.profile;

  // Hero
  $("heroRole").textContent = p.role;
  $("heroName").innerHTML = `${esc(p.name)}<small>${esc(p.nameEn)}</small>`;
  $("heroTagline").textContent = p.tagline;
  const heroLinks = [...p.links];
  if (p.resumeUrl) heroLinks.unshift({ label: "Resume", url: p.resumeUrl });
  $("heroLinks").innerHTML = heroLinks.map((l) => linkHtml(l, "pill")).join("");

  // About
  $("aboutText").innerHTML = p.about.map((t) => `<p>${esc(t)}</p>`).join("");
  const facts = [
    ["Location", p.location],
    ["Education", p.school],
    ["Email", `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>`, true],
  ];
  $("facts").innerHTML = facts
    .filter((f) => f[1])
    .map(([k, v, raw]) => `<div><dt>${k}</dt><dd>${raw ? v : esc(v)}</dd></div>`)
    .join("");
  $("skills").innerHTML = d.skills
    .map((s) => `<div class="skill"><h3>${esc(s.group)}</h3><ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`)
    .join("");

  // Internships
  $("internList").innerHTML = d.internships
    .map(
      (i) => `
      <article class="row">
        <div class="row-meta">${esc(i.period)}</div>
        <div>
          <h3>${esc(i.company)} <span class="muted">· ${esc(i.position)}</span></h3>
          <p>${esc(i.summary)}</p>
          ${i.highlights?.length ? `<ul class="bullets">${i.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        </div>
      </article>`
    )
    .join("");

  // Projects
  $("projectList").innerHTML = d.projects
    .map(
      (pr) => `
      <article class="card">
        <div class="card-top"><span class="muted">${esc(pr.period)}</span></div>
        <h3>${esc(pr.title)}</h3>
        <p>${esc(pr.summary)}</p>
        <ul class="tags">${pr.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="card-links">${(pr.links || []).map((l) => linkHtml(l)).join("")}</div>
      </article>`
    )
    .join("");

  // History
  $("historyList").innerHTML = d.history
    .map(
      (h) => `
      <li>
        <span class="row-meta">${esc(h.period)}</span>
        <div>
          <span class="badge">${esc(h.type)}</span>
          <strong>${esc(h.title)}</strong>
          ${h.detail ? `<p class="muted">${esc(h.detail)}</p>` : ""}
        </div>
      </li>`
    )
    .join("");

  // Contact / footer
  $("contactMail").href = `mailto:${p.email}`;
  $("contactMail").textContent = p.email;
  $("year").textContent = `© ${new Date().getFullYear()}`;
  $("footerName").textContent = p.nameEn;

  // Theme toggle
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (e) {}
  $("themeToggle").addEventListener("click", () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
    { threshold: 0.1 }
  );
  document.querySelectorAll(".section").forEach((s) => io.observe(s));
})();
