# 🚀 카카오 클라우드 배포 가이드

> **동접 프로젝트를 카카오 클라우드 서버에 배포하는 방법**

## 📋 현재 상태
- ✅ 환경변수 시스템 완료 (`.env.example` + `.env.local`)
- ✅ Next.js 15 최적화 설정 완료 (`next.config.ts`)
- ✅ GitHub Actions CI/CD 워크플로우 준비 완료
- ⏳ 카카오 클라우드 서버 발급 대기 중
- ⏳ 도메인 구매 대기 중


```
🌐 사용자 (HTTPS)
    ↓
📦 nginx (80/443) → Next.js (3000) → 카카오 클라우드
```

## 🛠️ 서버 설정 (한 번만 실행)

### 1. 기본 패키지 설치
```bash
# 서버 접속
ssh ubuntu@[카카오클라우드서버IP]

# 기본 업데이트 및 패키지 설치
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

### 2. nginx 기본 설정
```bash
# nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/dongjeop
```

```nginx
server {
    listen 80;
    server_name [미정 - 도메인]; # 예: dongjeop.com

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
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

### 첫 배포
```bash
# 1. 프로젝트 클론
cd /var/www
sudo mkdir dongjeop-front
sudo chown ubuntu:ubuntu dongjeop-front
git clone https://github.com/Dongjeop-lab/dongjeop-front.git dongjeop-front
cd dongjeop-front

# 2. 환경변수 설정
cp .env.example .env.local
nano .env.local
# NEXT_PUBLIC_API_URL, NEXT_PUBLIC_MAP_API_KEY 등 실제 값으로 설정

# 3. 빌드 및 실행
npm ci
npm run build
pm2 start npm --name "dongjeop" -- start

# 4. 자동 시작 설정
pm2 save
pm2 startup
```

### 업데이트 배포
```bash
# 1. 최신 코드 가져오기
cd /var/www/dongjeop-front
git pull origin main

# 2. 의존성 업데이트 및 빌드
npm ci
npm run build

# 3. 서버 재시작
pm2 restart dongjeop
```

## ⚙️ GitHub Actions 자동 배포

GitHub Secrets에 다음 정보 추가:
```bash
# 🖥️ 서버 정보
KAKAO_SERVER_HOST=서버IP
KAKAO_SERVER_USER=ubuntu  
KAKAO_SERVER_SSH_KEY=SSH개인키

# 🌐 환경별 설정
NEXT_PUBLIC_API_URL_PROD=API주소         # main 브랜치용
NEXT_PUBLIC_API_URL_DEV=개발API주소      # develop 브랜치용
NEXT_PUBLIC_DOMAIN_PROD=dongjeop.com
NEXT_PUBLIC_DOMAIN_DEV=dev.dongjeop.com

# 🗺️ 공통 설정
NEXT_PUBLIC_MAP_API_KEY=지도API키
```

워크플로우 활성화:
```bash
mv .github/workflows/deploy-kakao-cloud.yml.template .github/workflows/deploy-kakao-cloud.yml
# 파일 내 주석 해제 후 커밋
```

## 🔀 Dev 환경 배포 (develop 브랜치)

> **참고**: 기본 가이드는 Prod 환경 기준입니다. Dev 환경은 GitHub Actions로 자동 배포됩니다.

### Dev 환경 특이사항
```bash
# 포트: 3001 (Prod는 3000)
# 디렉토리: /var/www/dongjeop-front/dev
# PM2 앱명: dongjeop-dev
# 도메인: dev.dongjeop.com

# Dev 환경 수동 배포 (필요시)
cd /var/www/dongjeop-front/dev
git pull origin develop
npm ci && npm run build
pm2 restart dongjeop-dev
```

### nginx 설정 (Dev 도메인 추가 시)
```nginx
# /etc/nginx/sites-available/dongjeop에 추가
server {
    listen 80;
    server_name dev.dongjeop.com;
    location / {
        proxy_pass http://localhost:3001;  # Dev 포트
        # ... (나머지 설정은 동일)
    }
}
```

## 🔧 기본 관리 명령어

```bash
# 서버 상태 확인
pm2 status
pm2 logs dongjeop          # Prod 환경 로그
pm2 logs dongjeop-dev      # Dev 환경 로그

# nginx 상태 확인  
sudo systemctl status nginx
sudo nginx -t

# 재시작
pm2 restart dongjeop       # Prod 환경
pm2 restart dongjeop-dev   # Dev 환경  
sudo systemctl restart nginx

# SSL 인증서 갱신
sudo certbot renew --dry-run
```

## ⚠️ 문제 해결

### 서비스 접속 안 될 때
```bash
# 1. PM2 상태 확인
pm2 status

# 2. nginx 설정 확인
sudo nginx -t
sudo systemctl status nginx

# 3. 포트 확인
sudo netstat -tulpn | grep :3000    # Prod 환경
sudo netstat -tulpn | grep :3001    # Dev 환경
sudo netstat -tulpn | grep :80
```

### 로그 확인
```bash
# Next.js 로그
pm2 logs dongjeop          # Prod 환경
pm2 logs dongjeop-dev      # Dev 환경

# nginx 로그
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 📝 주의사항

- **도메인 설정**: DNS A 레코드를 서버 IP로 설정
- **방화벽**: 카카오 클라우드에서 80, 443, 22 포트 열기
- **백업**: 중요한 변경 전에는 `pm2 save` 실행
- **환경변수**: `.env.local` 파일에 실제 API 키 설정 필요

> 📅 **업데이트**: 2024년 12월  
> 🎯 **대상**: 초기 개발 단계의 간단한 배포  
> 🔗 **관련 문서**: README.md, README-GITHUB-SETUP.md