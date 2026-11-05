# jubin — 개인 포트폴리오

콘셉트: **Ideas in the Air** — 하늘과 구름, 원근감 있는 프로젝트 갤러리.

## 구조

```
public/
  index.html               # 메인 페이지 (Hero · Work · About · Projects · Process · Contact)
  404.html                 # 없는 주소일 때 보이는 페이지
  projects/<slug>/         # 프로젝트 상세 페이지 (npm run pages 로 자동 생성)
  css/style.css            # 디자인
  js/data.js               # ★ 모든 내용은 여기서 수정
  js/common.js             # 공통 기능 (헤더, 모바일 메뉴, 카드 이미지)
  js/main.js               # 메인 페이지 (캐러셀, 그리드, 이메일 복사)
  js/project.js            # 상세 페이지
  img/projects/            # 프로젝트 대표 이미지
scripts/generate-pages.js  # 상세 페이지 생성기
server.js                  # 로컬 미리보기 서버
```

## 내용 수정

1. `public/js/data.js`에서 글을 바꿉니다. `[대괄호]` 부분이 아직 채우지 않은 자리입니다.
2. 프로젝트를 추가하거나 삭제했다면 `npm run pages`를 실행합니다.
3. 커밋하고 push하면 Render가 자동으로 다시 배포합니다.

## 로컬 실행

```bash
npm start
```

→ http://localhost:3000

## 배포 (Render Static Site)

- Repository: `sjubin/jubin`, Branch: `main`
- Build Command: 비워둠
- Publish Directory: `public`
