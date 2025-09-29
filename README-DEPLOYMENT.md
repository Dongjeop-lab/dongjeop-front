# 🚀 카카오 클라우드 Docker 배포 가이드

> **동접 프로젝트를 카카오 클라우드 서버에 Docker로 배포하는 방법**

## 📋 현재 상태
- ✅ Docker 기반 배포 시스템 완료
- ✅ GitHub Actions CI/CD 워크플로우 완료
- ✅ 환경별 자동 API URL 처리 완료
- ✅ 무중단 배포 구현 완료
- ✅ 카카오 클라우드 레지스트리 연동 완료

```
🌐 사용자 (HTTPS)
    ↓
📦 nginx (80/443) → Docker Container (3001) → 카카오 클라우드
    ↓
🔄 GitHub Actions → 카카오 레지스트리 → 자동 배포
```

## 🛠️ 서버 설정 (한 번만 실행)

### 1. Docker 및 기본 패키지 설치
```bash
# 서버 접속
ssh ubuntu@[카카오클라우드서버IP]

# 기본 업데이트
sudo apt update && sudo apt upgrade -y

# Docker 설치
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu
sudo systemctl enable docker
sudo systemctl start docker

# nginx 설치
sudo apt install -y nginx git

# 재로그인 (Docker 그룹 적용)
exit
ssh ubuntu@[카카오클라우드서버IP]
```

### 2. nginx 리버스 프록시 설정
```bash
# nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/dongjeop
```

```nginx
server {
    listen 80;
    server_name [미정 - 도메인]; # 예: dongjeop.com

    # 프론트엔드 (Next.js Docker 컨테이너)
    location / {
        proxy_pass http://localhost:3001;  # Docker 컨테이너 포트
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 백엔드 API (리버스 프록시)
    location /api {
        proxy_pass http://localhost:6789;  # 백엔드 서버 포트
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/dongjeop /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 3. SSL 인증서 설정 (도메인 확정 후)
```bash
# Certbot 설치 및 SSL 인증서 발급
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d [미정-도메인]  # 예: dongjeop.com

# 자동 갱신 설정
sudo crontab -e
# 다음 줄 추가: 0 2 * * * /usr/bin/certbot renew --quiet
```

## 🚀 배포 과정

### 자동 배포 (GitHub Actions)
```bash
# 1. main 브랜치에 푸시하면 자동 배포
git push origin main

# 2. develop 브랜치에 푸시하면 staging 환경 배포
git push origin develop

# 3. 수동 배포 (GitHub Actions 페이지에서)
# - Actions 탭 → "🚀 프로덕션 배포" → "Run workflow"
# - 강제 리빌드, 배포 메시지 설정 가능
```

### 첫 배포 (서버 초기 설정)
```bash
# 1. 카카오 레지스트리 로그인 (서버에서 한 번만)
echo "KAKAO_REGISTRY_PASSWORD" | docker login KAKAO_REGISTRY_URL --username KAKAO_REGISTRY_USERNAME --password-stdin

# 2. 첫 컨테이너 실행 (GitHub Actions가 자동으로 처리)
# 수동으로 실행하려면:
docker run -d \
  --name dongjeop-frontend \
  --restart unless-stopped \
  -p 3001:3000 \
  -e NODE_ENV=production \
  KAKAO_REGISTRY_URL/PROJECT/dongjeop-frontend:latest
```

### 수동 배포 (필요시)
```bash
# 1. 최신 이미지 다운로드
docker pull KAKAO_REGISTRY_URL/PROJECT/dongjeop-frontend:latest

# 2. 기존 컨테이너 중지 및 제거
docker stop dongjeop-frontend
docker rm dongjeop-frontend

# 3. 새 컨테이너 실행
docker run -d \
  --name dongjeop-frontend \
  --restart unless-stopped \
  -p 3001:3000 \
  -e NODE_ENV=production \
  KAKAO_REGISTRY_URL/PROJECT/dongjeop-frontend:latest
```

## ⚙️ GitHub Actions 자동 배포

GitHub Repository Secrets에 다음 정보 추가:
```bash
# 🐳 Docker 레지스트리 정보
DOCKER_CA_CERT=카카오레지스트리CA인증서
KAKAO_REGISTRY_URL=카카오레지스트리URL
KAKAO_REGISTRY_USERNAME=레지스트리사용자명
KAKAO_REGISTRY_PASSWORD=레지스트리비밀번호
KAKAO_REGISTRY_PROJECT=프로젝트명

# 🖥️ 서버 정보
KAKAO_SERVER_HOST=서버IP
KAKAO_SERVER_USER=ubuntu  
KAKAO_SERVER_PORT=SSH포트
KAKAO_SSH_PRIVATE_KEY=SSH개인키
```

### 배포 워크플로우 특징:
- ✅ **브랜치별 자동 배포**: main → production, develop → staging
- ✅ **무중단 배포**: 헬스 체크 후 포트 전환
- ✅ **자동 롤백**: 배포 실패 시 자동 롤백
- ✅ **Docker 캐시**: 빌드 시간 단축
- ✅ **보안 강화**: CA 인증서 사용

## 🔀 Staging 환경 (develop 브랜치)

> **참고**: develop 브랜치 푸시 시 자동으로 staging 환경에 배포됩니다.

### Staging 환경 특징:
- **Docker 태그**: `staging`
- **포트**: 동일 (3001)
- **API URL**: 동일 (`/api`)
- **배포 방식**: 동일한 무중단 배포

### nginx 설정 (Staging 도메인 추가 시)
```nginx
# /etc/nginx/sites-available/dongjeop에 추가
server {
    listen 80;
    server_name staging.dongjeop.com;
    
    location / {
        proxy_pass http://localhost:3001;
        # ... (나머지 설정은 동일)
    }
    
    location /api {
        proxy_pass http://localhost:6789;  # 백엔드 서버
        # ... (나머지 설정은 동일)
    }
}
```

## 🔧 기본 관리 명령어

```bash
# Docker 컨테이너 상태 확인
docker ps
docker logs dongjeop-frontend

# nginx 상태 확인  
sudo systemctl status nginx
sudo nginx -t

# 컨테이너 재시작
docker restart dongjeop-frontend

# nginx 재시작
sudo systemctl restart nginx

# SSL 인증서 갱신
sudo certbot renew --dry-run

# 이미지 정리 (디스크 공간 확보)
docker image prune -f
docker system prune -f
```

## ⚠️ 문제 해결

### 서비스 접속 안 될 때
```bash
# 1. Docker 컨테이너 상태 확인
docker ps
docker logs dongjeop-frontend

# 2. nginx 설정 확인
sudo nginx -t
sudo systemctl status nginx

# 3. 포트 확인
sudo netstat -tulpn | grep :3001    # Docker 컨테이너
sudo netstat -tulpn | grep :6789    # 백엔드 서버
sudo netstat -tulpn | grep :80      # nginx

# 4. 컨테이너 헬스 체크
curl -f http://localhost:3001
```

### 로그 확인
```bash
# Docker 컨테이너 로그
docker logs dongjeop-frontend
docker logs -f dongjeop-frontend    # 실시간 로그

# nginx 로그
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# GitHub Actions 배포 로그
# GitHub → Actions 탭에서 확인
```

### 배포 실패 시
```bash
# 1. 이전 버전으로 롤백
docker pull KAKAO_REGISTRY_URL/PROJECT/dongjeop-frontend:이전태그
docker stop dongjeop-frontend
docker rm dongjeop-frontend
docker run -d --name dongjeop-frontend --restart unless-stopped -p 3001:3000 -e NODE_ENV=production KAKAO_REGISTRY_URL/PROJECT/dongjeop-frontend:이전태그

# 2. 컨테이너 완전 재시작
docker stop dongjeop-frontend
docker rm dongjeop-frontend
docker rmi KAKAO_REGISTRY_URL/PROJECT/dongjeop-frontend:latest
# GitHub Actions에서 재배포 실행
```

---

## 📝 주의사항

- **도메인 설정**: DNS A 레코드를 서버 IP로 설정
- **방화벽**: 카카오 클라우드에서 80, 443, 22, 3001, 6789 포트 열기
- **Docker 권한**: ubuntu 사용자가 docker 그룹에 포함되어야 함
- **레지스트리 로그인**: 서버에서 카카오 레지스트리 로그인 필수
- **환경변수**: API URL은 자동 처리, 추가 환경변수만 설정
- **백업**: 중요한 배포 전에는 현재 이미지 태그 기록

### 🔒 보안 고려사항
- **CA 인증서**: 카카오 레지스트리 CA 인증서 필수
- **SSH 키**: GitHub Secrets에 안전하게 저장
- **포트 노출**: 필요한 포트만 열기
- **컨테이너 재시작**: `--restart unless-stopped` 설정

> 📅 **업데이트**: 2024년 12월  
> 🎯 **대상**: Docker 기반 프로덕션 배포  
> 🔗 **관련 문서**: README.md, README-GITHUB-SETUP.md  
> 🐳 **배포 방식**: GitHub Actions + Docker + 무중단 배포