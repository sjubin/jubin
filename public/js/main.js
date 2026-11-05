(function () {
  const { D, esc, txt, extAttrs, cover, projectUrl, initHeader, initReveal, fillFooter } = window.SITE;
  const $ = (id) => document.getElementById(id);
  const p = D.profile;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Hero ---------- */
  $("heroEyebrow").textContent = D.hero.eyebrow;
  $("heroTitle").innerHTML = D.hero.title.map((l) => `<span>${txt(l)}</span>`).join("");
  $("heroDesc").innerHTML = txt(D.hero.description);

  // Decorative fanned teaser: up to 5 project covers, centre one largest.
  const teaserProjects = D.projects.slice(0, 5);
  const order = [3, 1, 0, 2, 4].filter((i) => i < teaserProjects.length); // centre gets the first project
  const shape = [
    { rot: -11, ty: 34, sc: 0.84 },
    { rot: -5, ty: 10, sc: 0.93 },
    { rot: 0, ty: 0, sc: 1.06 },
    { rot: 5, ty: 10, sc: 0.93 },
    { rot: 11, ty: 34, sc: 0.84 },
  ];
  const offset = Math.floor((5 - order.length) / 2);
  $("heroTeaser").innerHTML = order
    .map((idx, i) => {
      const s = shape[i + offset];
      return `<div class="teaser-card" style="--rot:${s.rot}deg;--ty:${s.ty}px;--sc:${s.sc};z-index:${3 - Math.abs(i + offset - 2)}">${cover(
        teaserProjects[idx],
        { lazy: false, mark: true, portrait: true }
      )}</div>`;
    })
    .join("");
  $("heroTeaser").querySelectorAll("img").forEach((img) => (img.alt = ""));

  /* ---------- Statement ---------- */
  $("statementLabel").textContent = D.statement.label;
  $("statementTitle").innerHTML = D.statement.lines
    .map((l) => `<span>${esc(l).replace(/\{([^}]+)\}/g, "<em>$1</em>")}</span>`)
    .join("");

  /* ---------- Featured carousel ---------- */
  const featured = D.projects.filter((x) => x.featured);
  const stage = $("carouselStage");
  const dots = $("dots");
  const info = $("carouselInfo");
  const prevBtn = $("prevBtn");
  const nextBtn = $("nextBtn");
  const mobileMQ = matchMedia("(max-width: 767px)");
  let active = 0;

  const POS = {
    "-2": { x: -420, s: 0.78, r: 14, z: 1 },
    "-1": { x: -230, s: 0.9, r: 8, z: 2 },
    0: { x: 0, s: 1, r: 0, z: 3 },
    1: { x: 230, s: 0.9, r: -8, z: 2 },
    2: { x: 420, s: 0.78, r: -14, z: 1 },
  };

  stage.innerHTML = featured
    .map(
      (pr, i) => `
      <button class="carousel-card" type="button" data-i="${i}" tabindex="-1"
        aria-label="${esc(pr.title)} (${i + 1} / ${featured.length})">
        ${cover(pr, { lazy: i > 2, mark: true, portrait: true })}
        <span class="card-overlay">
          <span class="card-cat">${esc(pr.category)}</span>
          <span class="card-title">${esc(pr.title)}</span>
          <span class="card-roles">${esc(pr.roles.join(" · "))}</span>
        </span>
      </button>`
    )
    .join("");
  const cards = [...stage.children];

  dots.innerHTML = featured
    .map((pr, i) => `<button class="dot" type="button" data-i="${i}" aria-label="${i + 1}번째 프로젝트: ${esc(pr.title)}"></button>`)
    .join("");
  const dotEls = [...dots.children];

  function renderInfo() {
    const pr = featured[active];
    info.innerHTML = `
      <h3>${txt(pr.title)}</h3>
      <p>${txt(pr.summary)}</p>
      <div class="info-meta">
        <span><strong>역할</strong> ${txt(pr.roles.join(" · "))}</span>
        <span><strong>연도</strong> ${txt(pr.year)}</span>
      </div>
      <a class="info-link" href="${projectUrl(pr)}">프로젝트 자세히 보기 <span aria-hidden="true">↗</span></a>`;
  }

  const n = featured.length;
  const circular = () => n >= 3 && !mobileMQ.matches;
  // Relative position of card i to the active card; wraps around on desktop so both sides stay filled.
  const relOf = (i) => {
    let rel = i - active;
    if (circular()) rel = ((rel + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
    return rel;
  };
  const prevRel = new Map();

  function layout() {
    cards.forEach((card, i) => {
      const rel = relOf(i);
      const pos = POS[rel];
      // A card wrapping from one end to the other jumps instead of sweeping across the stage.
      const jump = prevRel.has(i) && Math.abs(prevRel.get(i) - rel) > 2;
      prevRel.set(i, rel);
      if (jump) card.style.transition = "none";
      card.classList.toggle("is-active", rel === 0);
      card.classList.toggle("is-hidden", !pos);
      card.setAttribute("aria-current", rel === 0 ? "true" : "false");
      const v = pos || { x: rel < 0 ? -560 : 560, s: 0.7, r: rel < 0 ? 18 : -18, z: 0 };
      card.style.setProperty("--x", v.x);
      card.style.setProperty("--s", v.s);
      card.style.setProperty("--r", v.r + "deg");
      card.style.setProperty("--z", v.z);
      card.style.setProperty("--o", pos ? 1 : 0);
      if (jump) { void card.offsetWidth; card.style.transition = ""; }
    });
    dotEls.forEach((d, i) => d.setAttribute("aria-current", i === active ? "true" : "false"));
    prevBtn.disabled = !circular() && active === 0;
    nextBtn.disabled = !circular() && active === n - 1;
    renderInfo();
  }

  function go(i, { scroll = true } = {}) {
    const next = circular() ? (i + n) % n : Math.max(0, Math.min(n - 1, i));
    if (next === active && !scroll) return;
    active = next;
    layout();
    if (mobileMQ.matches && scroll) {
      const card = cards[active];
      stage.scrollTo({
        left: card.offsetLeft - (stage.clientWidth - card.clientWidth) / 2,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    }
  }

  prevBtn.addEventListener("click", () => go(active - 1));
  nextBtn.addEventListener("click", () => go(active + 1));
  dotEls.forEach((d) => d.addEventListener("click", () => go(+d.dataset.i)));
  cards.forEach((c) => c.addEventListener("click", () => { if (!mobileMQ.matches) go(+c.dataset.i); }));
  $("carousel").addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
  });

  // Mobile: native horizontal scroll with snap; sync the active card from scroll position.
  let scrollTimer;
  stage.addEventListener(
    "scroll",
    () => {
      if (!mobileMQ.matches) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const mid = stage.scrollLeft + stage.clientWidth / 2;
        let best = 0, bestD = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid);
          if (d < bestD) { bestD = d; best = i; }
        });
        if (best !== active) { active = best; layout(); }
      }, 80);
    },
    { passive: true }
  );
  mobileMQ.addEventListener("change", () => { prevRel.clear(); layout(); });
  layout();

  /* ---------- About ---------- */
  $("aboutTitle").innerHTML = D.about.title.map((l) => `<span>${txt(l)}</span>`).join("");
  $("aboutText").innerHTML = D.about.paragraphs.map((t) => `<p>${txt(t)}</p>`).join("");
  $("skillList").innerHTML = D.about.skills.map((s) => `<li>${esc(s)}</li>`).join("");
  $("facts").innerHTML = [
    ["Education", txt(p.school)],
    ["Based in", esc(p.location)],
    ["Email", `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>`],
  ]
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("");
  $("miniCards").innerHTML = D.about.cards
    .map((c) => `<dl class="mini-card"><dt>${esc(c.label)}</dt><dd>${txt(c.value)}</dd></dl>`)
    .join("");

  $("internList").innerHTML = D.internships
    .map(
      (i) => `
      <article class="intern">
        <p class="intern-period">${txt(i.period)}</p>
        <h4>${txt(i.company)} <span>· ${txt(i.position)}</span></h4>
        <p>${txt(i.summary)}</p>
        ${i.highlights?.length ? `<ul>${i.highlights.map((h) => `<li>${txt(h)}</li>`).join("")}</ul>` : ""}
      </article>`
    )
    .join("");
  $("historyList").innerHTML = D.history
    .map(
      (h) => `
      <li>
        <span class="tl-period">${txt(h.period)}</span>
        <div>
          <span class="tl-type">${esc(h.type)}</span><strong>${txt(h.title)}</strong>
          ${h.detail ? `<p class="tl-detail">${txt(h.detail)}</p>` : ""}
        </div>
      </li>`
    )
    .join("");

  /* ---------- All projects grid ---------- */
  $("projectGrid").innerHTML = D.projects
    .map(
      (pr) => `
      <a class="p-card g-${pr.layout || "square"} bg-${pr.accent || "blue"}${pr.placeholder ? " is-placeholder" : ""} reveal" href="${projectUrl(pr)}">
        <div class="p-media">${cover(pr)}</div>
        <div class="p-text">
          <span class="p-cat">${esc(pr.category)}</span>
          <h3 class="p-title">${esc(pr.title)}</h3>
          <p class="p-sum">${esc(pr.summary)}</p>
          <p class="p-meta">${esc(pr.year)} · ${esc(pr.roles.join(" · "))}</p>
          <span class="p-arrow" aria-hidden="true">↗</span>
        </div>
      </a>`
    )
    .join("");

  /* ---------- Process ---------- */
  $("processList").innerHTML = D.process
    .map(
      (s, i) => `
      <li class="reveal">
        <span class="step-num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </li>`
    )
    .join("");

  /* ---------- Contact ---------- */
  $("contactMail").textContent = p.email;
  $("mailBtn").href = `mailto:${p.email}`;
  $("contactLinks").innerHTML = p.links.map((l) => `<a href="${esc(l.url)}"${extAttrs(l.url)}>${esc(l.label)} ↗</a>`).join("");
  const status = $("copyStatus");
  $("copyBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(p.email);
      status.textContent = "이메일 주소를 복사했어요.";
    } catch (e) {
      // Fallback: select the address so it can be copied manually.
      const range = document.createRange();
      range.selectNodeContents($("contactMail"));
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      status.textContent = "복사하지 못했어요. 선택된 주소를 직접 복사하거나 ‘이메일 보내기’를 눌러주세요.";
    }
    clearTimeout(status._t);
    status._t = setTimeout(() => (status.textContent = ""), 4000);
  });

  /* ---------- Header: active section ---------- */
  initHeader();
  const navLinks = [...document.querySelectorAll(".nav-pill a")];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => {
          const on = a.getAttribute("href") === "#" + e.target.id;
          a.classList.toggle("active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => s && spy.observe(s));
  // Clear the highlight while the hero is on screen.
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) navLinks.forEach((a) => { a.classList.remove("active"); a.removeAttribute("aria-current"); });
  }, { threshold: 0.4 }).observe(document.querySelector(".hero"));

  fillFooter();
  initReveal();
})();
