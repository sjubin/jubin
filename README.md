# jubin — 개인 홈페이지 / 포트폴리오

## 구조

```
public/
  index.html      # 페이지 뼈대 (거의 안 건드려도 됨)
  css/style.css   # 디자인
  js/data.js      # ★ 내용은 여기만 수정 (프로필, 인턴, 프로젝트, 이력)
  js/main.js      # data.js를 화면에 그려주는 코드
  files/          # 이력서 PDF, 이미지 등 (필요할 때 생성)
server.js         # Render Web Service용 정적 서버 (의존성 없음)
```

## 로컬 실행

```bash
npm start
```

→ http://localhost:3000

## Render 배포

GitHub 새 레포 `jubin`에 올린 뒤 Render에서 연결합니다.

**A. 기존 서비스(ai-meeting-room) 재사용** — Settings → Build & Deploy → Repository 에서 레포를 `jubin`으로 변경
- Build Command: (비워둠 또는 `npm install`)
- Start Command: `npm start`

**B. 새 Static Site 생성 (무료)**
- Build Command: 비워둠
- Publish Directory: `public`
