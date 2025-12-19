# [테크포임팩트 2기] 동접 LAB

> **『동접』은 이동약자와 비이동약자 모두가 동등한 접근성을 가지길 바라는 마음으로 지어졌습니다.**<br/>
모든 장소의 물리적·환경적 접근성을 완벽하게 해결하는 데에는 한계가 있지만, **정보에 대한 접근성만큼은 누구에게나 공평하고 정확하게 제공**하고자 합니다.

> 본 서비스는 [카카오임팩트](https://www.kakaoimpact.org/)와 [계단뿌셔클럽](https://staircrusher.club/)의 지원, [테크포임팩트](https://techforimpact.io/) 커뮤니티의 기여로 개발되었습니다.

## ♿️ 서비스 개요
<!-- POSTER -->
<p align="center">
  <img src="public/images/readme/insta.png" alt="poster1" width="800">
</p>

<p align="center">
  <img src="public/images/readme/poster.png" alt="poster" height="500" style="margin-right: 20px;">
  <img src="public/images/readme/intro.png" alt="intro" height="500">
</p>

LAB 내 **실내 접근성 분석 AI 모델** 개발을 위한 [**데이터셋 수집 캠페인 서비스**](www.dongjeop.com/)입니다.

**공감형 퀴즈**를 통해 이동약자의 관점을 이해하고, 직접 촬영한 사진에 **접근성 정보를 라벨링**하여 AI 학습 데이터를 구축합니다. 참여 완료 시 **기여 카드**를 발급하고 SNS 공유 기능을 제공하여 캠페인 확산을 도모합니다.

- 🌍 이동약자의 접근성 불편 해소를 위한 사회적 인식 확대 및 공감 유도
- 📸 식당/카페 등의 실내 사진 데이터 수집
- 🏷️ 사용자 참여형 라벨링
- 🎮 게임화 요소를 통한 참여 동기 부여
- 🔗 SNS 공유를 통한 캠페인 확산

<!-- ## 주요 기능 -->

<!-- ## 유저 플로우 -->

## 🛠️ 기술 스택

- **Core** : Next.js 15, React 19, TypeScript
- **State Management** : TanStack Query 5
- **Styling** : Tailwind CSS 4
- **Animation** : Motion, Lottie
- **Deployment**: Kakao Cloud, Docker
- **Dev Tools & Analytics**: ESLint, Prettier, Google Analytics


## 📁 프로젝트 구조

**콜로케이션(Colocation) 패턴**을 사용해 기능별로 관련 파일을 한 곳에 모아 관리했습니다.

```
dongjeop-front/
├── .github/                    # GitHub 설정 (GitHub Actions CI/CD, 이슈/PR 템플릿)
├── public/                     # 정적 파일 (fonts, icons, images)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── _components/       # 앱 전역 컴포넌트
│   │   ├── _utils/            # 앱 전역 유틸리티
│   │   ├── api/               # API 클라이언트
│   │   │
│   │   ├── label/             # 라벨링 기능
│   │   │   ├── [imageKey]/    # 동적 라우트
│   │   │   │   ├── _components/  # 페이지 전용 컴포넌트
│   │   │   │   ├── _hooks/       # 페이지 전용 훅
│   │   │   │   ├── _types/       # 페이지 전용 타입
│   │   │   │   ├── finish/       # 라벨링 완료 페이지
│   │   │   │   │   └── page.tsx  # /label/[imageKey]/finish
│   │   │   │   └── page.tsx      # /label/[imageKey]
│   │   │   └── upload/        # 이미지 업로드
│   │   │       └── page.tsx      # /label/upload
│   │   │
│   │   ├── quiz/              # 퀴즈 페이지
│   │   │   └── page.tsx          # /quiz
│   │   │
│   │   ├── terms/             # 약관 페이지
│   │   │   └── page.tsx          # /terms
│   │   │
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── page.tsx           # 홈 /
│   │
│   ├── components/            # 전역 재사용 컴포넌트
│   │
│   ├── contexts/              # React Context (Tanstack Query Provider)
│   │
│   ├── lib/                   # 공통 유틸리티 및 설정
│   │   ├── constants.ts       # 전역 상수
│   │   ├── ga.ts              # Google Analytics
│   │   ├── path.ts            # 경로 관리
│   │   └── utils.ts           # 유틸리티 함수
│   │
│   └── types/                 # 전역 TypeScript 타입
│
├── Dockerfile                 # Docker 설정
├── docker-compose.yml         # Docker Compose 설정
├── next.config.ts             # Next.js 설정
├── package.json               # 의존성 관리
├── tsconfig.json              # TypeScript 설정
└── ...config files            # 기타 설정 파일
```
## 👥 팀원 소개

<div align="center">

| 양혜림 | 정유정 | 조재석 |
|:------:|:------:|:------:|
| <img src="https://github.com/hyrmzz1.png" alt="양혜림" width="150"> | <img src="https://github.com/dbwjd5864.png" alt="정유정" width="150"> | <img src="https://github.com/Pridesd.png" alt="조재석" width="150"> |
| FE | FE | FE |
| [GitHub](https://github.com/hyrmzz1) | [GitHub](https://github.com/dbwjd5864) | [GitHub](https://github.com/Pridesd) |

</div>