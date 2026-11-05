/*
 * ─────────────────────────────────────────────
 *  사이트의 모든 내용은 이 파일 하나에서 관리합니다.
 *  메인 갤러리 · 전체 목록 · 상세 페이지가 같은 데이터를 씁니다.
 *
 *  [대괄호] 로 된 부분은 아직 채우지 않은 자리입니다. 배포 전에 바꿔주세요.
 *  프로젝트를 추가/삭제했다면 터미널에서 `npm run pages` 를 실행해
 *  상세 페이지(/projects/<slug>/)를 다시 만들어 주세요.
 * ─────────────────────────────────────────────
 */
window.SITE_DATA = {
  profile: {
    logo: "jubin",
    name: "송주빈",
    nameEn: "Jubin Song",
    role: "[직무]", // 예: "개발자", "AI 서비스 기획자"
    email: "sjubin0712@gmail.com",
    school: "삼육대학교 [학과]",
    location: "Seoul, Korea",
    links: [
      { label: "GitHub", url: "https://github.com/sjubin" },
      // { label: "LinkedIn", url: "https://www.linkedin.com/in/..." },
    ],
    resumeUrl: "", // public/files/resume.pdf 를 넣고 "/files/resume.pdf"
  },

  hero: {
    eyebrow: "Ideas in the Air",
    title: ["아이디어를", "바로 쓰는 서비스로."],
    description:
      "안녕하세요, [직무] 송주빈입니다. 필요한 문제를 찾아 직접 만들고, 실제로 써보며 다듬습니다.",
  },

  statement: {
    label: "A little about me",
    // {강조}로 감싼 단어는 파란색으로 표시됩니다
    lines: ["보기 좋은 화면에서 시작해,", "{사용하기 좋은} 경험까지."],
  },

  about: {
    title: ["생각을 정리하고,", "화면으로 설득합니다."],
    paragraphs: [
      "[소개 문구 1 — 관심 분야와 지금 하고 있는 일을 적어주세요.]",
      "[소개 문구 2 — 일하는 방식, 중요하게 생각하는 기준을 적어주세요.]",
    ],
    skills: ["Node.js", "Python", "JavaScript", "LLM API 연동", "업무 자동화", "Render 배포"],
    cards: [
      { label: "관심 분야", value: "[관심 분야]" },
      { label: "주로 쓰는 도구", value: "Node.js · Python · GitHub Actions · Render" },
      { label: "지금 집중하는 것", value: "[현재 집중하고 있는 작업]" },
    ],
  },

  // 인턴 경험
  internships: [
    {
      company: "[회사 / 기관 이름]",
      position: "[직무]",
      period: "[2026.00 – 2026.00]",
      summary: "[어떤 팀에서 어떤 일을 했는지 한두 줄로]",
      highlights: ["[구체적으로 한 일 1]", "[구체적으로 한 일 2]"],
    },
  ],

  // 이력 (학력, 활동, 수상, 자격증) — 최신순
  history: [
    { period: "[연도]", type: "활동", title: "[활동 / 수상 / 자격증]", detail: "" },
    { period: "[입학연도] –", type: "학력", title: "삼육대학교 [학과]", detail: "재학 중" },
  ],

  process: [
    { title: "Discover", text: "누가 어떤 상황에서 불편한지 먼저 듣고, 해결할 문제를 한 문장으로 정리합니다." },
    { title: "Structure", text: "꼭 필요한 기능과 화면의 우선순위를 정해, 처음 쓰는 사람도 길을 잃지 않게 만듭니다." },
    { title: "Design & Build", text: "화면과 실제 동작을 함께 만들고, 빠르게 배포해 진짜 환경에서 확인합니다." },
    { title: "Refine", text: "직접 써보고 받은 피드백으로 글씨 크기 하나, 문구 하나까지 계속 고쳐 나갑니다." },
  ],

  /*
   * 프로젝트
   *  - featured: true  → 메인 상단 갤러리에 표시
   *  - layout          → 전체 목록 카드 크기 (wide / tall / square / full)
   *  - accent          → blue / mint / cream / pink / charcoal
   *  - cover           → 대표 이미지 경로. 없으면 accent 색의 기본 그래픽이 표시됩니다
   *  - mock            → 이미지가 없을 때 기본 그래픽 모양 (browser / chat / phone)
   */
  projects: [
    {
      slug: "ai-meeting-room",
      title: "AI 회의실",
      summary: "Claude · GPT · Gemini 세 AI가 하나의 질문을 두고 토론하고, 결론까지 정리해 주는 웹 서비스.",
      category: "Web Service",
      year: "2026",
      period: "2026.11",
      team: "[개인 / 팀 프로젝트]",
      roles: ["기획", "개발"],
      tools: ["Node.js", "Claude API", "OpenAI API", "Gemini API", "Render"],
      cover: "/img/projects/ai-meeting-room.png",
      coverAlt: "AI 회의실 소개 이미지 — 세 AI가 토론하고 결론까지 냅니다",
      coverPosition: "left center",
      mock: "meeting", // 세로 카드(갤러리)에서는 이미지 대신 이 그래픽을 사용
      accent: "blue",
      layout: "wide",
      featured: true,
      overview:
        "질문 하나를 입력하면 Claude, GPT, Gemini가 각자 의견을 내고 서로 토론한 뒤 합의와 권고안을 정리합니다. 지난 회의는 회의 기록실에 남아 다시 볼 수 있습니다.",
      problem: "[이 서비스를 만들게 된 이유와 해결하려던 문제를 적어주세요.]",
      decisions: [
        { title: "들어가자마자 바로 질문", text: "비밀번호와 단계를 없애고 첫 화면에서 바로 질문할 수 있게 바꿨습니다." },
        { title: "결론부터 보기", text: "긴 토론 내용보다 결론 요약을 맨 위에 두어, 원하는 답을 먼저 확인하게 했습니다." },
        { title: "누구나 읽기 쉬운 화면", text: "큰 글씨와 '글자 작게 / 글자 크게' 버튼으로 어르신도 편하게 읽을 수 있게 했습니다." },
        { title: "끊기지 않는 응답", text: "Gemini 사용량 한도나 과부하가 생기면 다른 모델로 자동 전환되게 했습니다." },
      ],
      result: "[사용해 본 사람들의 반응, 확인한 변화, 배운 점을 적어주세요.]",
    },
    {
      slug: "news-monitor",
      title: "정책금융 뉴스 브리핑 봇",
      summary: "정책금융기관 12곳과 주요 부처의 뉴스를 매일 모아, 보고 양식에 맞춰 텔레그램으로 보내는 자동화 봇.",
      category: "Automation",
      year: "2026",
      period: "2026.10",
      team: "[개인 / 팀 프로젝트]",
      roles: ["기획", "개발"],
      tools: ["Python", "Google News RSS", "Telegram Bot API", "GitHub Actions"],
      cover: "",
      coverAlt: "",
      accent: "mint",
      mock: "chat",
      layout: "tall",
      featured: true,
      overview:
        "평일 오후 3시쯤, 직전 영업일 14:55부터 오늘 14:55까지의 기관별 뉴스를 모아 번호순 브리핑으로 보냅니다. 주말과 공휴일에는 발송하지 않습니다.",
      problem: "[매일 뉴스를 직접 찾아 정리하던 과정에서 어떤 점이 불편했는지 적어주세요.]",
      decisions: [
        { title: "영업일 기준 수집", text: "월요일이나 연휴 다음 날에는 주말·연휴 기사까지 함께 모읍니다." },
        { title: "중복 기사 묶기", text: "같은 보도자료를 여러 매체가 쓴 기사는 대표 기사 한 줄로 묶었습니다." },
        { title: "원본 링크로 변환", text: "구글 뉴스 주소 대신 언론사 원본 주소로 바꿔 바로 열 수 있게 했습니다." },
        { title: "중요한 주제 먼저", text: "핵심 주제어가 들어간 기사를 각 기관 안에서 위쪽에 표시합니다." },
      ],
      result: "[실제로 얼마나 쓰였는지, 업무가 어떻게 달라졌는지 적어주세요.]",
    },
    {
      slug: "portfolio",
      title: "jubin — 포트폴리오",
      summary: "지금 보고 계신 사이트. 하늘과 구름을 콘셉트로 직접 디자인하고 구현한 개인 포트폴리오.",
      category: "Web",
      year: "2026",
      period: "2026.11",
      team: "개인 프로젝트",
      roles: ["디자인", "개발"],
      tools: ["HTML", "CSS", "JavaScript", "Render"],
      cover: "",
      coverAlt: "",
      accent: "cream",
      mock: "browser",
      layout: "square",
      featured: true,
      liveUrl: "https://jubin.onrender.com",
      repositoryUrl: "https://github.com/sjubin/jubin",
      overview: "프레임워크 없이 HTML · CSS · JavaScript만으로 만든 정적 사이트입니다. 모든 내용은 데이터 파일 하나에서 관리합니다.",
      problem: "",
      decisions: [
        { title: "데이터 한 곳에서 관리", text: "갤러리, 목록, 상세 페이지가 같은 데이터를 읽어 내용이 어긋나지 않습니다." },
        { title: "가벼운 입체감", text: "3D 엔진 없이 CSS 원근만으로 카드 갤러리를 구현했습니다." },
        { title: "모두가 쓸 수 있게", text: "키보드 조작, 모션 줄이기 설정, 모바일 스와이프를 지원합니다." },
      ],
      result: "",
    },
    {
      slug: "project-4",
      title: "[프로젝트 이름]",
      summary: "[프로젝트 한 줄 설명 — 문제, 해결, 결과 순서로]",
      category: "[분류]",
      year: "[연도]",
      period: "",
      team: "",
      roles: ["[역할]"],
      tools: [],
      cover: "",
      accent: "pink",
      mock: "phone",
      layout: "square",
      featured: true,
      placeholder: true,
    },
    {
      slug: "project-5",
      title: "[프로젝트 이름]",
      summary: "[프로젝트 한 줄 설명]",
      category: "[분류]",
      year: "[연도]",
      roles: ["[역할]"],
      tools: [],
      cover: "",
      accent: "charcoal",
      mock: "browser",
      layout: "square",
      featured: false,
      placeholder: true,
    },
  ],
};
