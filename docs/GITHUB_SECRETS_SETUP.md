# 🔒 GitHub Secrets 설정 완벽 가이드

CI/CD 자동 배포를 위해 GitHub Secrets에 등록해야 할 총 **9개**의 설정값들을 단계별로 안내합니다.

## 📍 GitHub Secrets 등록 경로

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Secrets and variables** 클릭
4. **Actions** 클릭
5. **New repository secret** 버튼 클릭

---

## 🏠 1단계: 카카오 클라우드 레지스트리 설정 (4개)

### 1-1. KAKAO_REGISTRY_URL
```
Name: KAKAO_REGISTRY_URL
Value: your-project.kr-central-2.kcr.dev
```

**📋 값 확인 방법:**
1. [카카오 클라우드 콘솔](https://console.kakaocloud.com) 로그인
2. **Container Registry** 서비스 선택
3. 생성한 레지스트리의 **접속 정보** 확인
4. `kr-central-2.kcr.dev` 앞의 프로젝트명 포함한 전체 URL 복사

**예시:** `dongjeop-project.kr-central-2.kcr.dev`

---

### 1-2. KAKAO_REGISTRY_PROJECT
```
Name: KAKAO_REGISTRY_PROJECT  
Value: dongjeop
```

**📋 값 설정:**
- 카카오 클라우드 레지스트리에서 생성한 **프로젝트명**
- 일반적으로 `dongjeop` 사용 권장

---

### 1-3. KAKAO_REGISTRY_USERNAME
```
Name: KAKAO_REGISTRY_USERNAME
Value: your-email@example.com
```

**📋 값 확인 방법:**
1. 카카오 클라우드 콘솔에서 **Container Registry** 접속
2. **사용자 관리** 또는 **접속 정보** 확인
3. 로그인에 사용하는 **이메일 주소** 또는 **사용자명** 입력

---

### 1-4. KAKAO_REGISTRY_PASSWORD
```
Name: KAKAO_REGISTRY_PASSWORD
Value: your-registry-password
```

**📋 값 확인 방법:**
1. 카카오 클라우드 콘솔에서 **액세스 토큰** 생성
2. 또는 계정 **비밀번호** 사용
3. **⚠️ 보안 주의**: 이 값은 절대 노출되지 않도록 주의

**테스트 방법:**
```bash
# 로컬에서 레지스트리 로그인 테스트
docker login your-project.kr-central-2.kcr.dev
# Username: 위에서 설정한 username
# Password: 위에서 설정한 password
```

---

## 🖥️ 2단계: 서버 접속 정보 설정 (3개)

### 2-1. KAKAO_SERVER_HOST
```
Name: KAKAO_SERVER_HOST
Value: 123.45.67.89
```

**📋 값 확인 방법:**
1. 카카오 클라우드 콘솔에서 **Virtual Machine** 확인
2. 생성한 서버의 **공인 IP 주소** 복사
3. 숫자만 입력 (예: `123.45.67.89`)

**테스트 방법:**
```bash
# SSH 접속 테스트
ssh ubuntu@123.45.67.89
```

---

### 2-2. KAKAO_SERVER_USER
```
Name: KAKAO_SERVER_USER
Value: ubuntu
```

**📋 값 설정:**
- 일반적으로 `ubuntu` 사용
- 서버 생성 시 설정한 사용자명 입력

---

### 2-3. KAKAO_SERVER_PORT
```
Name: KAKAO_SERVER_PORT
Value: 22
```

**📋 값 설정:**
- 일반적으로 SSH 기본 포트 `22` 사용
- 보안을 위해 포트를 변경한 경우 해당 포트 번호 입력
- 예: `2222`, `22000` 등

---

### 2-4. KAKAO_SSH_PRIVATE_KEY
```
Name: KAKAO_SSH_PRIVATE_KEY
Value: -----BEGIN OPENSSH PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
(전체 SSH 개인키 내용)
...
-----END OPENSSH PRIVATE KEY-----
```

**📋 값 설정 방법:**

**Option 1: 기존 키 사용 (이미 키가 있는 경우)**
```bash
# 개인키 내용 확인 및 복사
cat ~/.ssh/id_rsa
# 또는
cat ~/.ssh/id_ed25519
```

**Option 2: 새 키 생성**
```bash
# 새 SSH 키 생성
ssh-keygen -t ed25519 -C "dongjeop-deploy"
# 생성 경로: ~/.ssh/dongjeop_deploy

# 개인키 내용 복사
cat ~/.ssh/dongjeop_deploy

# 공개키를 서버에 등록
ssh-copy-id -i ~/.ssh/dongjeop_deploy.pub ubuntu@123.45.67.89
```

**⚠️ 주의사항:**
- `-----BEGIN` 부터 `-----END` 까지 **전체 내용** 복사
- **개행 문자 포함**하여 정확히 복사
- 공개키(.pub)가 아닌 **개인키** 복사

---

## 🌐 3단계: 애플리케이션 설정 (1개)

### 3-1. NEXT_PUBLIC_API_URL
```
Name: NEXT_PUBLIC_API_URL
Value: http://your-backend-server:8000
```

**📋 값 설정:**
- **로컬 개발**: `http://localhost:8000`
- **프로덕션**: `http://your-server-ip:8000` 또는 도메인 주소
- 백엔드 서버가 8000포트에서 실행된다고 가정

**예시:**
- `http://123.45.67.89:8000`
- `https://api.dongjeop.com` (도메인 사용 시)

---

## ✅ 설정 완료 확인

모든 Secrets 등록 후 다음과 같이 8개가 설정되어 있어야 합니다:

### 📋 체크리스트
- [ ] **KAKAO_REGISTRY_URL** (예: `project.kr-central-2.kcr.dev`)
- [ ] **KAKAO_REGISTRY_PROJECT** (예: `dongjeop`)
- [ ] **KAKAO_REGISTRY_USERNAME** (예: `your-email@example.com`)
- [ ] **KAKAO_REGISTRY_PASSWORD** (토큰 또는 비밀번호)
- [ ] **KAKAO_SERVER_HOST** (예: `123.45.67.89`)
- [ ] **KAKAO_SERVER_USER** (예: `ubuntu`)
- [ ] **KAKAO_SERVER_PORT** (예: `22`)
- [ ] **KAKAO_SSH_PRIVATE_KEY** (전체 개인키 내용)
- [ ] **NEXT_PUBLIC_API_URL** (예: `http://server-ip:8000`)

---

## 🧪 설정 테스트 방법

### 1. SSH 접속 테스트
```bash
ssh -i ~/.ssh/your-private-key ubuntu@123.45.67.89
```

### 2. Docker 레지스트리 테스트
```bash
docker login your-project.kr-central-2.kcr.dev
docker pull hello-world
docker tag hello-world your-project.kr-central-2.kcr.dev/dongjeop/test:latest
docker push your-project.kr-central-2.kcr.dev/dongjeop/test:latest
```

### 3. CI/CD 파이프라인 테스트
1. `master` 브랜치에 작은 변경사항 push
2. GitHub **Actions** 탭에서 워크플로우 실행 확인
3. 각 단계별 로그 확인

---

## ❗ 문제 해결

### SSH 접속 실패 시
```bash
# SSH 키 권한 확인
chmod 600 ~/.ssh/your-private-key

# SSH 접속 디버그
ssh -v ubuntu@123.45.67.89

# 공개키가 서버에 등록되어 있는지 확인
cat ~/.ssh/authorized_keys  # 서버에서 실행
```

### 레지스트리 로그인 실패 시
- 사용자명/비밀번호 재확인
- 카카오 클라우드 콘솔에서 레지스트리 상태 확인
- 액세스 토큰 재생성

### GitHub Actions 실패 시
1. **Actions** 탭 → 실패한 워크플로우 클릭
2. 각 단계별 로그 상세 확인
3. Secrets 값 재확인 (특히 개행 문자 포함 여부)

---

## 🔐 보안 모범 사례

1. **SSH 키는 별도 생성** 권장 (개인용과 분리)
2. **정기적인 액세스 토큰 갱신**
3. **불필요한 권한 최소화**
4. **서버 방화벽 설정** (필요한 포트만 개방)

---

## 📞 추가 지원

설정 중 문제가 발생하면:
1. GitHub Issues에 문의
2. 각 단계별 스크린샷 첨부
3. 에러 메시지 전체 복사하여 첨부
