# 📈 레지스트리 구축 후 배포 방법

## 🎯 현재 vs 미래 배포 방법

### 현재 (임시): 수동 파일 전송
```bash
# 개발자 로컬
docker build -t dongjeop-frontend .
docker save dongjeop-frontend -o dongjeop-frontend.tar

# 파일 전송 (Slack, SCP 등)
scp dongjeop-frontend.tar ubuntu@server:~/

# 서버에서 로드
docker load -i dongjeop-frontend.tar
docker run -d dongjeop-frontend
```

### 미래 (레지스트리): 자동화된 배포
```bash
# 개발자 로컬
docker build -t dongjeop-frontend .
docker tag dongjeop-frontend registry.dongjeop.com/frontend:latest
docker push registry.dongjeop.com/frontend:latest

# 서버에서 바로 풀
docker pull registry.dongjeop.com/frontend:latest
docker run -d registry.dongjeop.com/frontend:latest
```

## 🔧 레지스트리 구축 후 변경할 파일들

### 1. GitHub Actions 워크플로우 수정
```yaml
# .github/workflows/deploy.yml
- name: Build and Push to Registry
  run: |
    docker build -t $REGISTRY_URL/dongjeop-frontend:$GITHUB_SHA .
    docker push $REGISTRY_URL/dongjeop-frontend:$GITHUB_SHA
    
- name: Deploy to Server
  run: |
    ssh $SERVER_USER@$SERVER_HOST "
      docker pull $REGISTRY_URL/dongjeop-frontend:$GITHUB_SHA
      docker stop dongjeop-frontend || true
      docker run -d --name dongjeop-frontend $REGISTRY_URL/dongjeop-frontend:$GITHUB_SHA
    "
```

### 2. Docker Compose 설정
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    image: registry.dongjeop.com/dongjeop-frontend:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### 3. 배포 스크립트 자동화
```bash
#!/bin/bash
# deploy.sh
echo "Pulling latest image..."
docker pull registry.dongjeop.com/dongjeop-frontend:latest

echo "Stopping old container..."
docker stop dongjeop-frontend || true
docker rm dongjeop-frontend || true

echo "Starting new container..."
docker run -d --name dongjeop-frontend \
  --network host \
  registry.dongjeop.com/dongjeop-frontend:latest

echo "Deployment completed!"
```

## 🚀 레지스트리의 장점

### 현재 방법의 불편함
- ❌ 230MB 파일을 매번 전송
- ❌ 수동 프로세스 (실수 가능성)
- ❌ 버전 관리 어려움
- ❌ 롤백 복잡함

### 레지스트리 사용 시 장점
- ✅ 이미지 버전 관리
- ✅ 자동화된 CI/CD
- ✅ 빠른 배포 (delta 전송)
- ✅ 쉬운 롤백
- ✅ 팀 협업 편의성

## 📅 전환 계획

### 단계 1: 임시 배포 (현재)
- [x] docker save/load 방식
- [x] 수동 파일 전송
- [x] 기본 기능 테스트

### 단계 2: 레지스트리 구축 (예정)
- [ ] 인증서 문제 해결
- [ ] 레지스트리 서버 구축
- [ ] 접근 권한 설정

### 단계 3: 자동화 구축 (미래)
- [ ] GitHub Actions 수정
- [ ] 배포 스크립트 작성
- [ ] 모니터링 설정

## 🔄 전환 시 해야 할 일

1. **레지스트리 URL 확인**
2. **인증 정보 설정** (GitHub Secrets)
3. **CI/CD 파이프라인 수정**
4. **기존 수동 프로세스 제거**

---

**현재는 수동 전송이지만, 곧 자동화된 배포로 전환 예정입니다!** 🚀
