# BIZN - AI 기반 기업 뉴스 요약 서비스

## 프로젝트 소개


https://github.com/user-attachments/assets/db6c505f-1320-428e-8f59-3a843604a752

BIZN은 기업 뉴스를 한 곳에서 쏙 찾아볼 수 있는 서비스입니다.

## System Architecture
![423235776-7f14b623-52a4-480f-b1c2-ae27440787b6](https://github.com/user-attachments/assets/eb000f25-6811-4e74-95ca-4b4462e73eef)

## Next.js 선택 이유

1. **빠른 개발 속도**
   - 파일 기반 라우팅으로 해커톤에 적합

2. **효율적인 데이터 처리**
   - 뉴스 = 읽기 전용 콘텐츠
   - 적은 사용자 인터랙션
   - SSR에 최적화

3. **개발 경험**
   - 이미 익숙한 프레임워크
   - 러닝커브 최소화

4. **생태계**
   - 문서화가 잘 되어 있음
   - 활발한 커뮤니티 지원
   - 다양한 플러그인 및 확장 기능

## 사용 기술 스택

### Frontend Framework
- Next.js 15 (App Router)
- React 18
- TypeScript

### UI Libraries
- Material-UI (MUI)
  - Autocomplete
  - TextField
  - Accordion
  - Icons

### Styling
- Tailwind CSS
- CSS Modules

### Charts
- Chart.js
  - react-chartjs-2
  - chartjs-adapter-date-fns
  - chartjs-plugin-zoom

### Fonts
- Geist (Google Fonts)
- Geist Mono (Google Fonts)

### Data Fetching
- Next.js Server Components
- Server-Side Rendering (SSR)

### Animation
- CSS Transitions
- CSS Animations
- Suspense for Loading States

### Development Tools
- ESLint
- Prettier
- TypeScript

## 주요 기능
- 기업 검색
- 기업 주가 차트
- AI 기반 뉴스 요약
- AI 기반 관련 키워드 분석
- AI 기반 감성 분석 기반 뉴스 분류
- 기업 정보 조회

## 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드 및 실행
```bash
npm run build
npm start
```


