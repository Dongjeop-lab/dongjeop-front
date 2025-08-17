# 🚀 배포 가이드

## 📋 현재 상태
- ✅ 환경변수 템플릿 설정 완료 (`.env.example`)
- ✅ Next.js 15 배포 최적화 설정 완료 (`next.config.ts`)
- ✅ GitHub Actions CI/CD 워크플로우 준비 완료
- ✅ 자동 라벨링, Issue/PR 템플릿 설정 완료
- ✅ 배포 옵션 준비 완료 (Vercel + 커스텀 서버)

## 🛠️ 배포 준비 단계

### 1. 환경변수 설정
```bash
# .env.example을 복사하여 실제 환경변수 파일 생성
cp .env.example .env.local        # 개발환경
cp .env.example .env.production   # 프로덕션환경 (배포 시)
```

각 파일에서 실제 값들을 채워넣으세요.

### 2. 배포 방식 선택

**🎯 2가지 배포 옵션 중 선택:**

| 옵션 | 적합한 경우 | 장점 | 단점 | 월 비용 |
|------|------------|------|------|--------|
| **Vercel** | 빠른 시작, 스타트업 | 간편함, 자동 최적화, PR 미리보기 | 비용 증가, 플랫폼 종속성 | $0-100+ |
| **커스텀 서버** | 완전한 제어, 대규모 | 모든 기능, 완전한 제어권 | 복잡성, 운영 부담 | $10-50+ |

#### A) Vercel 배포 (권장)
```bash
# 1. 워크플로우 활성화
mv .github/workflows/deploy-vercel.yml.template .github/workflows/deploy-vercel.yml

# 2. 파일 내용에서 주석 해제

# 3. GitHub Secrets 추가 필요:
# - VERCEL_TOKEN
# - VERCEL_ORG_ID  
# - VERCEL_PROJECT_ID
# - NEXT_PUBLIC_API_URL
# - NEXT_PUBLIC_MAP_API_KEY
```

#### B) 커스텀 서버 배포
```bash
# 백엔드 팀과 협의 후 결정
mv .github/workflows/deploy-custom-server.yml.template .github/workflows/deploy-custom-server.yml
```

## 🔧 환경별 설정

### 개발 환경
- **실행**: `npm run dev` (Turbopack 활성화)
- **환경변수**: `.env.local`
- **API**: `http://localhost:3001` (백엔드 개발서버)
- **포트**: `http://localhost:3000`

### 스테이징 환경 (추후)
- **환경변수**: GitHub Secrets
- **API**: `https://staging-api.dongjeop.com`
- **Git Flow**: `chore/github-setup` → `develop` → 스테이징 자동 배포

### 프로덕션 환경
- **환경변수**: GitHub Secrets  
- **API**: `https://api.dongjeop.com`
- **Git Flow**: `develop` → `main` → 프로덕션 자동 배포

## ⚠️ 주의사항

1. **환경변수 보안**
   - `.env.local`, `.env.production` 파일은 절대 커밋하지 마세요
   - GitHub Secrets를 통해서만 민감한 정보를 관리하세요

2. **빌드 및 품질 검사**
   ```bash
   # 전체 CI 검사 (권장)
   npm run ci
   
   # 또는 개별 실행
   npm run lint        # ESLint 검사
   npm run typecheck   # TypeScript 검사
   npm run build       # 프로덕션 빌드
   npm run preview     # 빌드 결과 미리보기
   
   # 캐시 문제 시
   npm run clean       # 캐시 정리
   ```

3. **브랜치 보호 및 Git Flow**
   - **develop**: 개발 통합 브랜치 (모든 기능 머지)
   - **main**: 프로덕션 배포 브랜치 (CI 통과 후에만 머지)
   - 배포 전 반드시 스테이징에서 테스트

4. **GitHub Actions 설정**
   - ✅ CI 워크플로우: 모든 PR에 대해 자동 검사
   - ✅ Auto-Labeler: 파일 변경에 따른 자동 라벨링
   - ⏳ 배포 워크플로우: 배포 방식 결정 후 활성화

## 🛠️ 개발 도구

### 유용한 npm 스크립트들
```bash
npm run dev          # 개발 서버 (Turbopack)
npm run build        # 프로덕션 빌드
npm run typecheck    # TypeScript 타입 검사
npm run lint         # ESLint 코드 검사
npm run ci           # 전체 CI 검사 (lint + typecheck + build)
npm run preview      # 빌드 후 미리보기
npm run clean        # 캐시 및 빌드 파일 정리
```


---

> 📅 **최종 업데이트**: 2024년 12월  
> 👥 **문서 작성**: @jyj0216jyj  
> 🔗 **연관 문서**: README-GITHUB-SETUP.md
