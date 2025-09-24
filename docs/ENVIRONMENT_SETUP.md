# 🌍 환경변수 설정 가이드

CI/CD 배포를 위한 환경변수와 GitHub Secrets 설정 방법입니다.

## 📋 로컬 개발 환경변수

프로젝트 루트에 `.env.local` 파일을 생성하세요:

```bash
# .env.local 파일 내용

# =============================================================================
# 개발 환경 설정
# =============================================================================

# 백엔드 API 서버 주소 (개발용)
NEXT_PUBLIC_API_URL=http://localhost:8000

# 도메인 설정 (선택사항)
NEXT_PUBLIC_DOMAIN=localhost:3000

# 지도 API 키 (향후 구현 시 사용)
# NEXT_PUBLIC_MAP_API_KEY=your-map-api-key
```

## 🔒 GitHub Secrets 설정

GitHub 저장소 → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### 1. 카카오 클라우드 레지스트리 설정

```bash
# 레지스트리 URL (카카오 클라우드 콘솔에서 확인)
KAKAO_REGISTRY_URL=your-project.kr-central-2.kcr.dev

# 프로젝트 이름
KAKAO_REGISTRY_PROJECT=dongjeop

# 레지스트리 사용자명 (일반적으로 이메일)
KAKAO_REGISTRY_USERNAME=your-email@example.com

# 레지스트리 비밀번호 또는 액세스 토큰
KAKAO_REGISTRY_PASSWORD=your-registry-password
```

### 2. 서버 접속 정보

```bash
# 카카오 클라우드 서버 IP 주소
KAKAO_SERVER_HOST=123.45.67.89

# SSH 접속 사용자명 (일반적으로 ubuntu)
KAKAO_SERVER_USER=ubuntu

# SSH 개인키 (전체 내용 복사 붙여넣기)
KAKAO_SSH_PRIVATE_KEY=-----BEGIN OPENSSH PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
(전체 SSH 개인키 내용)
...
-----END OPENSSH PRIVATE KEY-----
```

### 3. 애플리케이션 설정

```bash
# 프로덕션 백엔드 API URL
NEXT_PUBLIC_API_URL=http://your-backend-server:8000
```

---

## 🛠️ 카카오 클라우드 레지스트리 설정 방법

### 1. 컨테이너 레지스트리 생성

1. 카카오 클라우드 콘솔 접속
2. **Container Registry** 서비스 선택
3. **새 레지스트리 생성**
4. 프로젝트명: `dongjeop` 입력
5. 생성 완료 후 **접속 정보** 확인

### 2. 로컬에서 레지스트리 테스트

```bash
# 레지스트리 로그인 테스트
docker login your-project.kr-central-2.kcr.dev

# 테스트 이미지 푸시
docker tag dongjeop-frontend:latest your-project.kr-central-2.kcr.dev/dongjeop/dongjeop-frontend:latest
docker push your-project.kr-central-2.kcr.dev/dongjeop/dongjeop-frontend:latest
```

---

## 🖥️ 카카오 클라우드 서버 설정

### 1. 서버 기본 설정

```bash
# 서버 접속
ssh ubuntu@your-server-ip

# Docker 설치
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# 재로그인 (Docker 권한 적용)
logout
ssh ubuntu@your-server-ip
```

### 2. nginx 설정 (백엔드에서 처리 예정)

```nginx
# /etc/nginx/sites-available/dongjeop
server {
    listen 80;
    server_name your-domain.com;
    
    # 프론트엔드 (3000포트)
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 백엔드 API (8000포트)  
    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🚀 배포 테스트 방법

### 1. 로컬 Docker 테스트

```bash
# Docker 이미지 빌드
docker build -t dongjeop-frontend .

# 컨테이너 실행
docker run -d --name test-frontend -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  dongjeop-frontend

# 테스트 페이지 확인
curl http://localhost:3000/hello

# 정리
docker stop test-frontend
docker rm test-frontend
```

### 2. CI/CD 파이프라인 테스트

1. **GitHub Secrets 설정 완료** 확인
2. `master` 브랜치에 코드 푸시
3. **Actions** 탭에서 배포 워크플로우 확인
4. 배포 완료 후 `http://your-server-ip:3000/hello` 접속 테스트

---

## ❗ 문제 해결

### Docker 빌드 실패 시

```bash
# Node.js 22 버전 확인
node --version

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### GitHub Actions 실패 시

1. **Secrets 설정** 재확인
2. **서버 SSH 접속** 테스트
3. **레지스트리 로그인** 테스트
4. Actions 탭에서 **상세 로그** 확인

### 서버 배포 실패 시

```bash
# 서버에서 직접 확인
docker ps -a
docker logs dongjeop-frontend
docker images

# 포트 사용 확인
sudo netstat -tulpn | grep :3000
```

---

## 📚 추가 참고자료

- [카카오 클라우드 Container Registry 가이드](https://console.kakaocloud.com/docs/)
- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Docker 멀티스테이지 빌드](https://docs.docker.com/develop/dev-best-practices/)
