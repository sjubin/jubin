/* Shared helpers: used by the main page, project detail pages and 404. */
(function () {
  const D = window.SITE_DATA;

  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Text wrapped in [brackets] is an unfilled placeholder → shown in a muted colour.
  const txt = (s = "") => esc(s).replace(/\[([^\]]+)\]/g, '<span class="placeholder-text">[$1]</span>');

  const isExternal = (url) => /^https?:\/\//.test(url);
  const extAttrs = (url) => (isExternal(url) ? ' target="_blank" rel="noopener"' : "");

  // Project cover: real image if provided, otherwise a generated graphic in the accent colour.
  // portrait: true → for tall cards; uses the generated graphic when the image is landscape-only.
  function cover(p, { lazy = true, mark = true, portrait = false } = {}) {
    const accent = `accent-${p.accent || "blue"}`;
    if (p.cover && !(portrait && p.mock)) {
      const pos = p.coverPosition ? ` style="object-position:${esc(p.coverPosition)}"` : "";
      return `<div class="cover ${accent}"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt || "")}"${pos}${
        lazy ? ' loading="lazy"' : ""
      } decoding="async" /></div>`;
    }
    let inner;
    if (p.mock === "meeting") {
      inner = `<div class="mock-meeting"><b>회의 진행 화면 <em>● 토론 중</em></b>
        <span style="--dot:#e8673a;--w:82%"><i></i>Claude</span>
        <span style="--dot:#13a37b;--w:60%"><i></i>GPT</span>
        <span style="--dot:#2f6fe0;--w:72%"><i></i>Gemini</span>
        <strong>결론 정리 완료 · 합의 · 권고안</strong></div>`;
    } else if (p.mock === "chat") {
      inner = `<div class="mock-chat"><span></span><span></span><span></span></div>`;
    } else if (p.mock === "phone") {
      inner = `<div class="mock-phone"><span></span><span></span><span></span></div>`;
    } else {
      inner = `<div class="mock-window"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-body"><b></b><b></b><b class="short"></b><div class="mock-tiles"><span></span><span></span></div></div></div>`;
    }
    return `<div class="cover mock ${accent}" aria-hidden="true">${
      mark ? `<span class="mock-mark">${esc(p.placeholder ? "Coming soon" : p.category)}</span>` : ""
    }${inner}</div>`;
  }

  const projectUrl = (p) => `/projects/${encodeURIComponent(p.slug)}/`;

  function initHeader({ alwaysLight = false } = {}) {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", alwaysLight || window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu
    const menu = document.getElementById("mobileMenu");
    const openBtn = document.getElementById("menuOpen");
    const closeBtn = document.getElementById("menuClose");
    if (!menu || !openBtn) return;
    const focusables = () => [...menu.querySelectorAll("a, button")];
    const open = () => {
      menu.hidden = false;
      document.body.classList.add("menu-open");
      openBtn.setAttribute("aria-expanded", "true");
      closeBtn.focus();
    };
    const close = (returnFocus = true) => {
      menu.hidden = true;
      document.body.classList.remove("menu-open");
      openBtn.setAttribute("aria-expanded", "false");
      if (returnFocus) openBtn.focus();
    };
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", () => close());
    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    menu.querySelectorAll("nav a").forEach((a) => a.addEventListener("click", () => close(false)));
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  function fillFooter() {
    const p = D.profile;
    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    set("footerName", esc(p.nameEn) + " · " + esc(p.name));
    set("footerRole", txt(p.role));
    set("copyright", `© ${new Date().getFullYear()} ${esc(p.nameEn)}. All rights reserved.`);
    const links = [{ label: "Email", url: `mailto:${p.email}` }, ...p.links];
    if (p.resumeUrl) links.push({ label: "Resume", url: p.resumeUrl });
    set("footerLinks", links.map((l) => `<li><a href="${esc(l.url)}"${extAttrs(l.url)}>${esc(l.label)}</a></li>`).join(""));
  }

  window.SITE = { D, esc, txt, extAttrs, cover, projectUrl, initHeader, initReveal, fillFooter };
})();
