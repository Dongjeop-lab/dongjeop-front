# 🗺️ 동접 (DongJeop) Frontend

> **이동약자와 비이동약자 모두가 동등한 접근성을 가질 수 있는 실내 정보 수집 플랫폼**

『동접』은 이동약자와 비이동약자 모두가 동등한 접근성을 가지길 바라는 마음으로 지어졌습니다. 모든 장소의 물리적이고 환경적인 접근성을 완벽하게 해결하는 데에는 한계가 있겠지만, 최소한 **정보에 대한 접근성만큼은 누구에게나 공평하고 정확하게 제공**하고자 합니다.

## 🎯 주요 기능

- **🗺️ 지도 기반 위치 검색**: 실내 접근성 정보를 확인하고 싶은 장소 검색
- **📷 이미지 업로드**: 해당 위치의 접근성 관련 사진 업로드 및 공유
- **📝 정보 입력**: 가게/시설의 접근성 정보 상세 입력 (경사로, 화장실, 출입구 등)
- **👥 커뮤니티**: 이동약자를 위한 정보 공유 및 소통

## 🛠️ 기술 스택

### **Frontend**
- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **UI Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Build Tool**: [Turbopack](https://turbo.build/pack) (개발 모드)

### **Development**
- **Linting**: [ESLint](https://eslint.org) + Next.js Config
- **Type Checking**: TypeScript Compiler
- **Package Manager**: npm
- **Version Control**: Git Flow 전략

### **CI/CD & Deployment**
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Quality Gates**: Lint + TypeCheck + Build 검증
- **Deployment**: Vercel (예정) / Custom Server 옵션
- **Environment**: Development, Staging, Production

## ⚡ 빠른 시작

### **Prerequisites**
- Node.js 20.10.0+ 
- npm 10.0.0+
- Git

### **설치 및 실행**

```bash
# 1. 저장소 클론
git clone https://github.com/Dongjeop-lab/dongjeop-front.git
cd dongjeop-front

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp .env.example .env.local
# .env.local 파일을 열어서 실제 값으로 수정

# 4. 개발 서버 실행 (Turbopack 사용)
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 🔧 개발 환경 설정

### **환경변수**
`.env.example` 파일을 참조하여 환경변수를 설정하세요:

```bash
# 클라이언트 접근 가능 (NEXT_PUBLIC_ 접두사)
NEXT_PUBLIC_API_URL=http://localhost:3001         # 백엔드 API URL
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key         # 지도 API 키
NEXT_PUBLIC_DOMAIN=localhost:3000                # 현재 도메인

# 서버 전용 (민감한 정보)
# DATABASE_URL=your_database_url                 # DB 연결 문자열 (향후)
# UPLOAD_SECRET_KEY=your_upload_secret           # 파일 업로드 시크릿 (향후)
```

### **개발 스크립트**

```bash
# 개발
npm run dev          # 개발 서버 실행 (Turbopack)

# 품질 검사
npm run lint         # ESLint 검사
npm run typecheck    # TypeScript 타입 검사
npm run ci           # 통합 품질 검사 (lint + typecheck + build)

# 빌드
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run preview      # 빌드 후 미리보기

# 유틸리티
npm run clean        # 캐시 및 빌드 파일 정리
```

## 📁 프로젝트 구조

```
dongjeop-front/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # 전역 스타일
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx           # 홈페이지
│   │   └── api/               # API Routes (향후)
│   ├── components/            # 재사용 가능한 컴포넌트 (향후)
│   │   ├── ui/               # 기본 UI 컴포넌트
│   │   └── map/              # 지도 관련 컴포넌트
│   ├── features/             # 기능별 모듈 (향후)
│   │   ├── map/             # 지도 기능
│   │   └── upload/          # 이미지 업로드 기능
│   ├── lib/                 # 라이브러리 및 유틸리티 (향후)
│   ├── types/               # TypeScript 타입 정의 (향후)
│   └── utils/               # 헬퍼 함수 (향후)
├── public/                   # 정적 파일
├── .github/                  # GitHub 설정
│   ├── workflows/           # GitHub Actions
│   ├── ISSUE_TEMPLATE/      # 이슈 템플릿
│   └── pull_request_template.md
└── ...config files
```

## 🚀 배포

### **배포 옵션**
1. **Vercel** (권장): 간편한 배포, 자동 최적화, PR 미리보기
2. **Custom Server**: Docker 기반, 완전한 제어권

### **배포 프로세스**
```bash
# 배포 전 품질 검사
npm run ci

# 환경별 배포
main 브랜치 → 프로덕션 배포
develop 브랜치 → 스테이징 배포 (향후)
```

자세한 배포 가이드는 **[README-DEPLOYMENT.md](./README-DEPLOYMENT.md)**를 참조하세요.

## 🔗 API 및 백엔드 연동

### **API 연동 계획**
```bash
# 예정된 API 엔드포인트들
GET    /api/places              # 장소 목록 조회
POST   /api/places              # 새 장소 정보 추가
GET    /api/places/:id          # 특정 장소 상세 조회
POST   /api/places/:id/images   # 장소 이미지 업로드
GET    /api/accessibility       # 접근성 정보 조회
```

> 📝 **참고**: 백엔드 API는 현재 계획 단계입니다. API 문서(Swagger)가 완성되면 이 섹션을 업데이트할 예정입니다.

## 📚 관련 문서

- **[GitHub 협업 가이드](./README-GITHUB-SETUP.md)**: 팀 온보딩, 이슈/PR 템플릿, 자동화 시스템
- **[배포 가이드](./README-DEPLOYMENT.md)**: 환경별 배포 방법, Vercel/Custom Server 설정
- **[환경변수 가이드](./.env.example)**: 개발/프로덕션 환경변수 템플릿

## 🤝 기여하기

1. 이 저장소를 Fork
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

자세한 협업 가이드는 **[README-GITHUB-SETUP.md](./README-GITHUB-SETUP.md)**를 참조하세요.

## 👥 팀

- **[@jyj0216jyj](https://github.com/jyj0216jyj)**: 프로젝트 리드, 지도 기능, GitHub 설정
- **[@hyrmzz1](https://github.com/hyrmzz1)**: UI/UX, 컴포넌트, 업로드 기능

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

> 💡 **프로젝트 상태**: 초기 개발 단계  
> 🔄 **최종 업데이트**: 2024년 12월  
> 📧 **문의**: GitHub Issues 또는 담당자에게 연락
