/*
 * ─────────────────────────────────────────────
 *  사이트 내용은 전부 이 파일에서 수정합니다.
 *  HTML을 건드리지 않고 아래 값만 바꾸면 화면에 반영됩니다.
 *  (항목을 추가하려면 { ... } 블록을 복사해서 붙여넣기)
 * ─────────────────────────────────────────────
 */
window.SITE_DATA = {
  profile: {
    name: "송주빈",
    nameEn: "Jubin Song",
    role: "Developer", // 예: "백엔드 개발자", "AI 엔지니어 지망생"
    tagline: "한 줄 소개를 여기에 적어주세요. 어떤 문제를 풀고 싶은 사람인지.",
    about: [
      "자기소개 첫 문단입니다. 무엇을 공부하고 있고, 어떤 일에 관심이 있는지 적어주세요.",
      "두 번째 문단입니다. 일하는 방식이나 강점을 짧게 적으면 좋습니다.",
    ],
    location: "Seoul, Korea",
    school: "삼육대학교 ○○학과",
    email: "sjubin0712@gmail.com",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/" },
      { label: "Blog", url: "#" },
    ],
    resumeUrl: "", // 이력서 PDF를 public/files/ 에 넣고 "files/resume.pdf" 처럼 적으면 버튼이 생깁니다
  },

  skills: [
    { group: "Language", items: ["Python", "JavaScript", "Java"] },
    { group: "Framework", items: ["React", "Node.js", "Spring"] },
    { group: "Tools", items: ["Git", "Docker", "Render"] },
  ],

  // 인턴 경험
  internships: [
    {
      company: "회사 이름",
      position: "인턴 직무",
      period: "2025.07 – 2025.08",
      summary: "어떤 팀에서 무슨 일을 했는지 한두 줄로.",
      highlights: [
        "구체적인 성과 1 (숫자가 있으면 좋아요)",
        "구체적인 성과 2",
      ],
    },
  ],

  // 프로젝트
  projects: [
    {
      title: "AI Meeting Room",
      period: "2026.11",
      summary: "프로젝트 한 줄 설명.",
      tags: ["Node.js", "AI", "Render"],
      links: [
        { label: "Demo", url: "#" },
        { label: "GitHub", url: "#" },
      ],
    },
    {
      title: "프로젝트 2",
      period: "2026.03 – 2026.06",
      summary: "문제 → 해결 → 결과 순서로 짧게.",
      tags: ["Python"],
      links: [{ label: "GitHub", url: "#" }],
    },
  ],

  // 이력 (학력, 활동, 수상, 자격증 등) — 최신순
  history: [
    { period: "2026", type: "수상", title: "○○ 공모전 우수상", detail: "" },
    { period: "2025", type: "활동", title: "○○ 동아리 / 학회", detail: "역할이나 한 일" },
    { period: "2022 –", type: "학력", title: "삼육대학교 ○○학과", detail: "재학 중" },
  ],
};
