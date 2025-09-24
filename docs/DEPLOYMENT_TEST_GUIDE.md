# 🧪 배포 테스트 및 검증 가이드

CI/CD 파이프라인과 서버 배포 후 정상 동작을 확인하는 완전한 테스트 절차입니다.

## 📋 테스트 단계별 체크리스트

### ✅ 1단계: 로컬 환경 테스트

#### 1-1. Docker 빌드 테스트
```bash
# 프론트엔드 Docker 이미지 빌드
docker build -t dongjeop-frontend-test .

# 빌드 성공 확인
docker images | grep dongjeop-frontend-test
```

#### 1-2. 로컬 컨테이너 실행 테스트
```bash
# 컨테이너 실행 (프론트엔드만)
docker run -d --name test-frontend -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  dongjeop-frontend-test

# 컨테이너 상태 확인
docker ps | grep test-frontend

# 로그 확인
docker logs test-frontend
```

#### 1-3. 기본 연결 테스트
```bash
# 프론트엔드 접속 확인
curl -f http://localhost:3000

# 브라우저 접속 테스트
open http://localhost:3000
```

#### 1-4. 정리
```bash
docker stop test-frontend
docker rm test-frontend
docker rmi dongjeop-frontend-test
```

---

### ✅ 2단계: 로컬 Docker 환경 테스트

#### 2-1. 프론트엔드 실행
```bash
# 프론트엔드 컨테이너 실행
docker-compose up -d dongjeop-frontend

# 서비스 상태 확인
docker-compose ps
```

#### 2-2. 기본 접속 테스트
```bash
# 프론트엔드 접속 확인
curl http://localhost:3000

# 컨테이너 로그 확인
docker-compose logs dongjeop-frontend
```

#### 2-3. 정리
```bash
docker-compose down
```

---

### ✅ 3단계: GitHub Actions CI/CD 테스트

#### 3-1. GitHub Secrets 설정 확인
- [ ] **KAKAO_REGISTRY_URL** ✓
- [ ] **KAKAO_REGISTRY_PROJECT** ✓  
- [ ] **KAKAO_REGISTRY_USERNAME** ✓
- [ ] **KAKAO_REGISTRY_PASSWORD** ✓
- [ ] **KAKAO_SERVER_HOST** ✓
- [ ] **KAKAO_SERVER_USER** ✓
- [ ] **KAKAO_SSH_PRIVATE_KEY** ✓
- [ ] **NEXT_PUBLIC_API_URL** ✓

#### 3-2. CI/CD 파이프라인 실행
```bash
# master 브랜치에 테스트 커밋 푸시
git checkout master
echo "# CI/CD 테스트 $(date)" >> README.md
git add README.md
git commit -m "ci: CI/CD 파이프라인 테스트"
git push origin master
```

#### 3-3. GitHub Actions 모니터링
1. **GitHub 저장소** → **Actions** 탭 이동
2. **🚀 프로덕션 배포** 워크플로우 실행 확인
3. 각 단계별 로그 확인:
   - ✅ 코드 품질 검사
   - ✅ Docker 이미지 빌드
   - ✅ 레지스트리 푸시
   - ✅ 서버 배포
   - ✅ 헬스 체크

---

### ✅ 4단계: 프로덕션 서버 배포 검증

#### 4-1. 서버 접속 확인
```bash
# SSH 접속 테스트
ssh ubuntu@your-server-ip

# Docker 서비스 상태 확인
sudo systemctl status docker

# 컨테이너 실행 상태 확인
docker ps | grep dongjeop-frontend
```

#### 4-2. 서버에서 직접 테스트
```bash
# 서버 내부에서 헬스 체크
curl -f http://localhost:3000/hello

# 컨테이너 로그 확인
docker logs dongjeop-frontend

# 컨테이너 리소스 사용량 확인
docker stats dongjeop-frontend --no-stream
```

#### 4-3. 외부에서 접속 테스트
```bash
# 외부에서 서버 접속 (포트 3000)
curl -f http://your-server-ip:3000

# 브라우저 접속 테스트
open http://your-server-ip:3000
```

---

### ✅ 5단계: 백엔드 연동 테스트 (백엔드 팀과 협업)

> ⚠️ **주의**: 이 단계는 백엔드 팀이 8000포트에 백엔드 서버를 배포한 후 진행합니다.

#### 5-1. 백엔드 서버 상태 확인
```bash
# 서버에서 백엔드 연결 확인
ssh ubuntu@your-server-ip
curl -f http://localhost:8000/health
```

#### 5-2. 프론트엔드-백엔드 통합 테스트
1. **http://your-server-ip:3000** 접속하여 프론트엔드 정상 로드 확인
2. 브라우저 개발자 도구에서 **Network** 탭 열기
3. 프론트엔드에서 백엔드 API 호출 시 **응답 상태** 확인
4. **CORS 설정** 및 **API 연동** 정상 동작 확인

#### 5-3. nginx 프록시 테스트 (백엔드 팀 설정 후)
```bash
# nginx를 통한 접속 테스트 (80포트)
curl -f http://your-server-ip

# API 프록시 테스트
curl -f http://your-server-ip/api/health
```

#### 5-4. 무중단 배포 테스트 🚀
```bash
# 배포 전 서비스 상태 확인
curl -f http://your-server-ip:3000

# 새 코드 main 브랜치에 푸시 (자동 배포 트리거)
git push origin main

# GitHub Actions 진행 상황 모니터링
# 브라우저에서 GitHub > Actions 탭 확인

# 배포 중 서비스 연속성 확인 (다른 터미널에서)
while true; do
  status=$(curl -s -o /dev/null -w "%{http_code}" http://your-server-ip:3000)
  echo "$(date): HTTP Status $status"
  sleep 2
done

# 배포 완료 후 새 버전 확인
curl -f http://your-server-ip:3000
```

**📋 무중단 배포 검증 체크리스트:**
- [ ] 배포 중 서비스 중단 없음 (HTTP 200 응답 지속)
- [ ] 새 버전 컨테이너 정상 실행됨
- [ ] 헬스체크 통과 후 트래픽 전환됨
- [ ] 기존 컨테이너가 안전하게 종료됨
- [ ] 배포 실패 시 자동 롤백됨

---

## 🚨 문제 해결 가이드

### ❌ Docker 빌드 실패
```bash
# 캐시 클리어 후 재빌드
docker system prune -a
docker build --no-cache -t dongjeop-frontend .

# 의존성 문제 확인
rm -rf node_modules package-lock.json
npm install
```

### ❌ GitHub Actions 실패
1. **Actions 탭**에서 실패 단계 로그 확인
2. **Secrets 설정** 재검토
3. **SSH 키** 및 **레지스트리 인증** 재확인

### ❌ 서버 배포 실패
```bash
# 서버에서 직접 디버깅
ssh ubuntu@your-server-ip

# Docker 로그 확인
docker logs dongjeop-frontend

# 포트 사용 확인  
sudo netstat -tulpn | grep :3000

# 방화벽 확인
sudo ufw status
```

### ❌ API 연동 실패
```bash
# 네트워크 연결 확인
curl -v http://localhost:8000/health

# 백엔드 서버 상태 확인 (백엔드 팀과 협업)
# 8000포트 서비스 실행 여부 확인
```

---

## 📊 성능 및 모니터링

### 기본 성능 지표
```bash
# 컨테이너 리소스 사용량
docker stats dongjeop-frontend

# 응답 시간 측정
time curl -f http://your-server-ip:3000/hello

# 메모리 사용량 확인
free -h
```

### 로그 모니터링
```bash
# 실시간 로그 확인
docker logs -f dongjeop-frontend

# 최근 100줄 로그
docker logs --tail 100 dongjeop-frontend
```

---

## ✅ 최종 검증 체크리스트

### 배포 완료 확인
- [ ] GitHub Actions 워크플로우 성공 ✓
- [ ] Docker 이미지 레지스트리 푸시 완료 ✓
- [ ] 서버에 컨테이너 정상 실행 ✓
- [ ] 외부에서 접속 가능 (3000포트) ✓
- [ ] 테스트 페이지 정상 표시 ✓

### API 연동 확인 (백엔드 배포 후)
- [ ] Health Check API 응답 정상 ✓
- [ ] Test API 응답 정상 ✓
- [ ] 에러 처리 정상 동작 ✓
- [ ] 응답 시간 허용 범위 내 ✓

### 운영 준비도
- [ ] 컨테이너 자동 재시작 설정 ✓
- [ ] 로그 수집 체계 구축 ✓
- [ ] 모니터링 도구 연동 준비 ✓
- [ ] 백업 및 롤백 절차 수립 ✓

---

## 🎯 다음 단계

### 즉시 실행 가능:
1. **로컬 Docker 테스트** 진행
2. **GitHub Secrets** 설정
3. **CI/CD 파이프라인** 첫 실행

### 백엔드 팀과 협업 필요:
1. **백엔드 8000포트** 서버 구축
2. **nginx 프록시** 설정
3. **실제 API** 연동 테스트

### 운영 단계:
1. **도메인** 연결 (선택사항)  
2. **SSL 인증서** 설정
3. **모니터링 도구** 연동

---

> 🎉 **축하합니다!** 모든 단계를 완료하면 완전한 CI/CD 환경에서 자동 배포가 가능합니다!
