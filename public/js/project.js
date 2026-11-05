/* Project detail page: reads the slug from /projects/<slug>/ and renders from SITE_DATA. */
(function () {
  const { D, esc, txt, extAttrs, cover, projectUrl, initHeader, initReveal, fillFooter } = window.SITE;
  const root = document.getElementById("detail");
  const slug = decodeURIComponent((location.pathname.match(/\/projects\/([^/]+)/) || [])[1] || "");
  const list = D.projects;
  const idx = list.findIndex((x) => x.slug === slug);
  const pr = list[idx];

  initHeader();
  fillFooter();

  if (!pr) {
    root.innerHTML = `
      <section class="hero-wrap"><div class="hero nf">
        <h1 class="hero-title">404</h1>
        <p>찾으시는 프로젝트가 없어요.</p>
        <a class="btn btn-lime" href="/#work">프로젝트 보러 가기 <span class="btn-arrow" aria-hidden="true">→</span></a>
      </div></section>`;
    return;
  }

  document.title = `${pr.title} — Jubin`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = pr.summary;

  const section = (label, title, body) => `
    <section class="d-section reveal">
      <div><p class="label">${label}</p><h2>${title}</h2></div>
      <div>${body}</div>
    </section>`;
  const para = (t) => `<p class="d-text">${txt(t)}</p>`;

  const links = [];
  if (pr.liveUrl) links.push(`<a class="btn btn-lime" href="${esc(pr.liveUrl)}"${extAttrs(pr.liveUrl)}>사이트 보기 <span class="btn-arrow" aria-hidden="true">↗</span></a>`);
  if (pr.repositoryUrl) links.push(`<a class="btn btn-ghost" href="${esc(pr.repositoryUrl)}"${extAttrs(pr.repositoryUrl)}>코드 보기 ↗</a>`);

  const metaItems = [
    ["기간", pr.period || pr.year],
    ["형태", pr.team],
    ["역할", pr.roles.join(" · ")],
    ["도구", (pr.tools || []).slice(0, 3).join(" · ") + ((pr.tools || []).length > 3 ? " 외" : "")],
  ].filter(([, v]) => v && v.trim());

  const body = [];
  body.push(section("Overview", "프로젝트 개요", para(pr.overview || "[무엇을 만들었는지 2~3문장으로 설명해 주세요.]")));
  if (pr.problem !== "") body.push(section("Problem", "문제와 목표", para(pr.problem || "[해결하려던 문제와 목표를 적어주세요.]")));
  body.push(
    section(
      "My role",
      "담당 역할",
      `${para(pr.roleDetail || `${pr.roles.join(" · ")} — [본인이 맡은 부분을 구체적으로 적어주세요.]`)}
       ${pr.tools?.length ? `<ul class="tool-list" style="margin-top:20px">${pr.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}`
    )
  );
  if (pr.decisions?.length) {
    body.push(
      section(
        "Key decisions",
        "핵심 결정",
        `<div class="decisions">${pr.decisions
          .map((d, i) => `<article class="decision"><span>${String(i + 1).padStart(2, "0")}</span><h3>${txt(d.title)}</h3><p>${txt(d.text)}</p></article>`)
          .join("")}</div>`
      )
    );
  }
  const shots = pr.screens?.length
    ? pr.screens
        .map((s) => `<figure style="margin:0"><img class="shot-img" src="${esc(s.src)}" alt="${esc(s.alt || s.caption || "")}" loading="lazy" style="border-radius:20px;width:100%" />${s.caption ? `<figcaption class="p-meta">${esc(s.caption)}</figcaption>` : ""}</figure>`)
        .join("")
    : `<div class="shot">[주요 화면 스크린샷 1]</div><div class="shot">[주요 화면 스크린샷 2]</div>`;
  body.push(section("Screens", "주요 화면", `<div class="shots">${shots}</div>`));
  if (pr.result !== "") body.push(section("Outcome", "결과와 회고", para(pr.result || "[확인한 변화와 배운 점을 적어주세요.]")));

  const prev = list[(idx - 1 + list.length) % list.length];
  const next = list[(idx + 1) % list.length];

  root.innerHTML = `
    <section class="hero-wrap">
      <div class="detail-hero">
        <div class="clouds" aria-hidden="true"><span class="cloud k1"></span><span class="cloud k2"></span></div>
        <div class="container">
          <a class="back-link" href="/#work">← 모든 프로젝트</a>
          <p class="detail-cat">${esc(pr.category)}</p>
          <h1 class="detail-title">${esc(pr.title)}</h1>
          <p class="detail-summary">${txt(pr.summary)}</p>
          ${links.length ? `<div class="detail-links">${links.join("")}</div>` : ""}
          <dl class="detail-meta">${metaItems.map(([k, v]) => `<div><dt>${k}</dt><dd>${txt(v)}</dd></div>`).join("")}</dl>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="detail-cover reveal">${cover(pr, { lazy: false })}</div>
      <div class="detail-body">${body.join("")}</div>
      <nav class="detail-nav" aria-label="다른 프로젝트">
        <a href="${projectUrl(prev)}"><small>← 이전 프로젝트</small><strong>${esc(prev.title)}</strong></a>
        <a class="next" href="${projectUrl(next)}"><small>다음 프로젝트 →</small><strong>${esc(next.title)}</strong></a>
      </nav>
      <p class="detail-all"><a href="/#work">전체 프로젝트로 돌아가기</a></p>
    </div>`;

  initReveal();
})();
