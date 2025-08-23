# 🚀 GitHub 협업 환경 구축 가이드

## 📋 문서 목적
이 문서는 **dongjeop-front** 프로젝트의 GitHub 협업 환경 구성에 대한 **온보딩 가이드**와 **기술 문서**입니다.

---

## 🎯 구축된 협업 환경 개요

### **After (구축 후)**
```
✅ 표준화된 이슈/PR 템플릿 → 체계적인 정보 수집
✅ 자동 코드 리뷰어 할당 → 누락 없는 리뷰 프로세스
✅ 자동 CI/CD 파이프라인 → 품질 검증 + 자동 배포
✅ 자동 라벨링 시스템 → 효율적인 이슈/PR 관리
```

---

## 📁 생성된 파일 목록 및 역할

### **🔧 프로젝트 설정 파일**

| 파일 | 역할 | 변경사항 |
|------|------|----------|
| `package.json` | NPM 스크립트 | `clean`, `ci` 스크립트 추가 |
| `next.config.ts` | Next.js 설정 | Next.js 15 최적화, 보안 헤더 강화 |
| `.env.example` | 환경변수 템플릿 | 개발/프로덕션 환경변수 가이드 |
| `.gitignore` | Git 무시 목록 | 환경변수 파일 추가 |

### **📝 이슈 및 PR 템플릿**

| 파일 | 역할 | 주요 기능 |
|------|------|----------|
| `.github/ISSUE_TEMPLATE/bug_report.yml` | 버그 리포트 템플릿 | 재현 단계, 환경 정보, 긴급도 분류 |
| `.github/ISSUE_TEMPLATE/feature_request.yml` | 기능 제안 템플릿 | 카테고리별 분류, 우선순위, 수용 기준 |
| `.github/ISSUE_TEMPLATE/config.yml` | 이슈 템플릿 설정 | 빈 이슈 생성 방지 |
| `.github/pull_request_template.md` | PR 템플릿 | 변경사항 체크리스트, 품질 검사 항목 |

### **👥 코드 리뷰 및 소유권**

| 파일 | 역할 | 주요 기능 |
|------|------|----------|
| `.github/CODEOWNERS` | 코드 소유권 정의 | 파일별 자동 리뷰어 할당 |

### **🏷️ 자동 라벨링 시스템**

| 파일 | 역할 | 주요 기능 |
|------|------|----------|
| `.github/labeler.yml` | 라벨링 규칙 | 파일 경로 → 라벨 매핑 규칙 |
| `.github/workflows/labeler.yml` | 자동 라벨링 워크플로우 | PR 생성 시 자동 라벨 부여 |

### **🔍 CI/CD 파이프라인**

| 파일 | 역할 | 주요 기능 |
|------|------|----------|
| `.github/workflows/ci.yml` | 코드 품질 검사 | lint, typecheck, build 자동 실행 |
| `.github/workflows/deploy-kakao-cloud.yml.template` | 카카오 클라우드 배포 템플릿 | 간단한 서버 배포 자동화 |

### **📚 문서**

| 파일 | 역할 | 주요 기능 |
|------|------|----------|
| `README-DEPLOYMENT.md` | 배포 가이드 | 간단한 카카오 클라우드 배포 방법 |
| `README-GITHUB-SETUP.md` | GitHub 설정 가이드 | 이 문서 (협업 환경 온보딩) |

---

## 🚀 온보딩

### **1단계: 로컬 개발 환경 설정**
```bash
# 1. 저장소 클론
git clone https://github.com/jyj0216jyj/dongjeop-front.git
cd dongjeop-front

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 실제 값으로 수정

# 4. 개발 서버 실행
npm run dev
```

### **2단계: 개발 워크플로우 이해**
```bash
# 품질 검사 명령어들
npm run lint        # ESLint 검사
npm run typecheck   # TypeScript 타입 검사  
npm run build       # 프로덕션 빌드
npm run ci          # 통합 품질 검사 (위 3개 통합)
npm run clean       # 캐시 정리
```

### **3단계: Git 브랜치 전략**
```bash
# 기본 브랜치 구조 (Git Flow)
main         # 프로덕션 배포 브랜치
develop      # 개발 통합 브랜치
feature/*    # 기능 개발 브랜치
hotfix/*     # 긴급 수정 브랜치

# 일반적인 개발 플로우
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
# 개발 작업
git add .
git commit -m "feat: 새로운 기능 구현"
git push origin feature/your-feature-name
# GitHub에서 PR 생성
```

---

## 💼 일상적인 사용 방법

### **🐛 버그 발견 시**
1. **GitHub Issues** → **New issue** 클릭
2. **🐞 Bug Report** 템플릿 선택
3. 템플릿의 필수 항목들을 모두 채워서 제출
   - 재현 단계 (필수)
   - 환경 정보 (필수)
   - 긴급도 선택 (필수)

### **✨ 새 기능 제안 시**
1. **GitHub Issues** → **New issue** 클릭  
2. **✨ Feature Request** 템플릿 선택
3. 템플릿의 필수 항목들을 모두 채워서 제출
   - 문제 상황 및 배경 (필수)
   - 기능 카테고리 선택 (필수)
   - 우선순위 선택 (필수)

### **🔄 Pull Request 생성 시**
1. GitHub에서 **New pull request** 클릭
2. **자동으로 삽입되는 PR 템플릿** 확인
3. 각 섹션을 성실히 작성:
   - **📋 요약**: 무엇을, 왜 변경했는지
   - **🔄 변경사항**: 해당하는 영역 체크
   - **✅ 품질 검사**: 모든 항목 확인 후 체크
   - **👀 리뷰 포인트**: 리뷰어가 중점적으로 봐야 할 부분

### **🏷️ 자동 라벨링 이해**
PR 생성 시 **변경된 파일 경로**에 따라 자동으로 라벨이 부여됩니다:

```yaml
src/components/** → ui 라벨
src/app/api/** → api 라벨  
src/app/**/page.tsx → pages 라벨
src/types/** → types 라벨
*.md → documentation 라벨
.github/workflows/** → deployment 라벨
```

---

## ⚙️ 자동화된 시스템들

### **🔍 CI (Continuous Integration)**
모든 PR과 `main`, `develop` 브랜치 푸시 시:
```yaml
1. ESLint 코드 품질 검사
2. TypeScript 타입 검사  
3. Next.js 프로덕션 빌드
4. 결과를 GitHub PR에 자동 표시
```

### **👥 자동 코드 리뷰어 할당**
파일 변경 시 해당 영역 담당자에게 **자동으로 리뷰 요청**:
```yaml
src/components/** → @hyrmzz1 자동 할당
src/features/map/** → @jyj0216jyj 자동 할당
.github/** → @jyj0216jyj 자동 할당
```

### **🏷️ PR 자동 라벨링**
변경된 파일에 따라 **관련 라벨 자동 부여**:
- 팀원들이 한눈에 어떤 영역이 변경되었는지 파악 가능
- 리뷰어가 자신의 전문 분야 PR을 쉽게 필터링 가능

---

## 🚀 배포 가이드

### **카카오 클라우드 배포 구조**

```
🌐 사용자 (HTTPS) → nginx (80/443) → Next.js (3000) → 카카오 클라우드
```

| 환경 | 브랜치 | 도메인 | 배포 방식 |
|------|--------|--------|----------|
| **Dev** | `develop` | `[미정 - Dev 도메인]` | GitHub Actions 자동 배포 |
| **Prod** | `main` | `[미정 - 도메인]` | 수동 배포 → GitHub Actions (선택) |

### **🏗️ 간단한 배포 설정**
```bash
# 1. 서버 설정 (한 번만 실행)
# - 카카오 클라우드 서버 준비
# - Node.js, nginx, PM2 설치
# - 기본 nginx 설정
# - SSL 인증서 설정

# 2. 첫 배포
git clone → npm ci → npm run build → pm2 start

# 3. 업데이트 배포  
git pull → npm ci → npm run build → pm2 restart

# 4. GitHub Actions 자동화 (선택사항)
# - GitHub Secrets 설정 후 워크플로우 활성화
```

자세한 단계별 가이드는 **`README-DEPLOYMENT.md`** 참조

---

## 🏷️ 필수 GitHub 라벨 생성

**⚠️ 중요**: 자동 라벨링이 작동하려면 **먼저 GitHub에 라벨을 생성**해야 합니다!

### **생성 방법**
1. GitHub 저장소 → **Issues** 탭 → **Labels** 클릭
2. **New label** 클릭하여 아래 라벨들을 생성

### **필수 라벨 목록**
```yaml
# Issue/PR 템플릿용
bug                # 🐞 빨간색 (#d73a49) - 이미 존재할 수 있음
enhancement        # ✨ 초록색 (#a2eeef) - 이미 존재할 수 있음  
needs-triage       # 🏷️ 노란색 (#fbca04) - 새로 생성 필요

# 자동 라벨링용 (파일 경로 기반)
ui                 # 🎨 보라색 (#7057ff)
api                # 🔗 파란색 (#0075ca)
pages              # 📄 청록색 (#008672)
map                # 🗺️ 갈색 (#8b4513)
places             # 📍 초록색 (#28a745)
types              # 🎯 회색 (#6f42c1)
utils              # 🛠️ 진회색 (#586069)
styles             # 🎨 분홍색 (#db61a2)
config             # ⚙️ 검은색 (#2c3e50)
deployment         # 🚀 빨간색 (#b60205)
test               # 🧪 연초록 (#28a745)
assets             # 🖼️ 노란색 (#ffd33d)
pwa                # 📱 남색 (#1a1e36)
```

**💡 팁**: `documentation` 라벨은 이미 GitHub 기본 라벨로 존재합니다!

---

## 🛠️ 유지보수 및 문제 해결

### **새로운 팀원 추가 시**
```yaml
# .github/CODEOWNERS 파일 수정
src/new-feature/** @new-team-member
```

### **새로운 라벨/카테고리 추가 시**
```yaml
# 1. GitHub에서 라벨 생성
# 2. .github/labeler.yml에 규칙 추가
# 3. Issue/PR 템플릿에 새 카테고리 추가
```

### **환경변수 추가 시**  
```bash
# 1. .env.example에 새 변수 추가 (주석 포함)
# 2. README-DEPLOYMENT.md의 환경변수 섹션 업데이트
# 3. GitHub Secrets 설정 가이드 업데이트
```

### **CI 실패 시 일반적인 원인**
```bash
❌ ESLint 오류 → npm run lint로 로컬에서 확인 후 수정
❌ TypeScript 오류 → npm run typecheck로 타입 오류 수정  
❌ 빌드 실패 → npm run build로 로컬에서 빌드 테스트
❌ 의존성 충돌 → npm ci로 깨끗한 설치 후 재시도
```

---

---

## 📞 도움 및 문의

### **영역별 담당자**
- **GitHub 설정/CI/CD**: `@jyj0216jyj` → GitHub Issues에 `config` 라벨로 문의
- **UI/컴포넌트/스타일**: `@hyrmzz1` → GitHub Issues에 `ui` 라벨로 문의  
- **지도/위치 서비스**: `@jyj0216jyj` → GitHub Issues에 `map` 라벨로 문의

### **긴급 상황**
GitHub Issues에 **🔴 Critical** 긴급도로 Bug Report 생성 + 담당자 멘션

### **📚 추가 학습 자료**
- [GitHub Actions 가이드](https://docs.github.com/en/actions)
- [Next.js 공식 문서](https://nextjs.org/docs)  
- [카카오 클라우드 가이드](https://console.kakaocloud.com/docs)
- [nginx 공식 문서](https://nginx.org/en/docs/)

---

## 🎉 마무리

이제 **전문적이고 체계적인 GitHub 협업 환경**에서 개발할 수 있습니다!

**✨ 새로운 워크플로우**: 자동화된 품질 검사 → 체계적인 리뷰 → 자동 배포  
**🚀 다음 단계**: 카카오 클라우드 배포 설정 → 실제 기능 개발 시작

---

> 📅 **최종 업데이트**: 2024년 12월  
> 👥 **문서 작성**: @jyj0216jyj  
> 🔄 **버전**: v1.0.0