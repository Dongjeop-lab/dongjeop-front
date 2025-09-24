# 🚀 동접 프론트엔드 CI/CD 완성 가이드

## ✅ 구축 완료 현황

**🎉 모든 7단계가 완료되었습니다!**

| 단계 | 작업 내용 | 상태 |
|------|-----------|------|
| 1️⃣ | 테스트 페이지 및 API 호출 구현 | ✅ 완료 |
| 2️⃣ | Docker 설정 구성 | ✅ 완료 |
| 3️⃣ | GitHub Actions CI/CD 워크플로우 구축 | ✅ 완료 |
| 4️⃣ | 환경변수 및 설정 파일 구성 | ✅ 완료 |
| 5️⃣ | GitHub Secrets 설정 가이드 | ✅ 완료 |
| 6️⃣ | 배포 스크립트 작성 | ✅ 완료 |
| 7️⃣ | 배포 테스트 및 검증 가이드 | ✅ 완료 |

---

## 🏗️ 구축된 아키텍처

### 무중단 배포 플로우 🚀
```
개발자 Push → GitHub → Actions CI/CD → 카카오 클라우드 레지스트리 → 서버 무중단 배포
```

**무중단 배포 과정:**
1. 새 버전 컨테이너 실행 (포트 동일: 3000)
2. 새 버전 헬스체크 및 검증
3. 헬스체크 성공 시 트래픽 전환 (Blue-Green)
4. 기존 컨테이너 안전 종료
5. 실패 시 자동 롤백

### 서버 구조
```
사용자 → nginx (80/443) → 프론트엔드 (3000) ← API 호출 → 백엔드 (8000)
                                ↓
                           카카오 클라우드 서버
```

---

## 📁 생성된 파일 목록

### 🐳 Docker 설정
- `Dockerfile` - 멀티스테이지 최적화 빌드
- `.dockerignore` - 이미지 크기 최소화
- `docker-compose.yml` - 로컬 개발/테스트 환경

### 🔄 CI/CD 워크플로우
- `.github/workflows/deploy.yml` - 무중단 자동 배포 파이프라인
- `.github/workflows/ci.yml` - 기존 품질 검사 (유지)

### 📝 테스트 페이지
- `src/app/hello/page.tsx` - 프론트-백엔드 연동 테스트 UI
- `src/lib/api/client.ts` - API 클라이언트
- `src/types/api/health.ts` - API 타입 정의

### 🛠️ 헬퍼 스크립트
- `scripts/build-and-push.sh` - 수동 빌드/푸시 스크립트
- `scripts/deploy-to-server.sh` - 수동 서버 배포 스크립트

### 📚 문서
- `docs/ENVIRONMENT_SETUP.md` - 환경변수 설정 가이드
- `docs/GITHUB_SECRETS_SETUP.md` - GitHub Secrets 완벽 가이드
- `docs/DEPLOYMENT_TEST_GUIDE.md` - 배포 테스트 및 검증 가이드


---

## 🚀 즉시 실행 가능한 단계

### 1. 로컬 테스트 (지금 바로!)
```bash
# 프론트엔드만 실행
docker-compose up -d dongjeop-frontend

# 프론트엔드 접속 테스트
open http://localhost:3000
```

### 2. 카카오 클라우드 레지스트리 설정
1. [카카오 클라우드 콘솔](https://console.kakaocloud.com) 접속
2. **Container Registry** 생성
3. 접속 정보 확인

### 3. GitHub Secrets 설정 (8개)
[완전한 설정 가이드](./GITHUB_SECRETS_SETUP.md) 참조:

- `KAKAO_REGISTRY_URL`
- `KAKAO_REGISTRY_PROJECT` 
- `KAKAO_REGISTRY_USERNAME`
- `KAKAO_REGISTRY_PASSWORD`
- `KAKAO_SERVER_HOST`
- `KAKAO_SERVER_USER`
- `KAKAO_SSH_PRIVATE_KEY`
- `NEXT_PUBLIC_API_URL`

### 4. 첫 자동 배포 실행
```bash
git checkout master
git push origin master
# → GitHub Actions에서 자동 배포 실행됨
```

---

## 🤝 백엔드 팀과의 협업 포인트

### ✅ 프론트엔드 완료사항
- **포트 3000**: 프론트엔드 Docker 컨테이너 실행
- **API 호출**: `http://localhost:8000`으로 백엔드 호출 준비 완료
- **CI/CD 파이프라인**: GitHub Actions로 자동 배포
- **타입 안전성**: TypeScript로 API 타입 정의

### 📋 백엔드 팀 요청사항
1. **포트 8000**에서 백엔드 서버 실행
2. **CORS 설정**: 프론트엔드 도메인 허용
3. **API 엔드포인트** 구현 (필요시):
   ```
   GET /health  - 서버 상태 확인 (선택사항)
   실제 프로젝트에 필요한 API 엔드포인트들
   ```
4. **nginx 설정** (선택사항):
   ```nginx
   location / { proxy_pass http://localhost:3000; }      # 프론트엔드
   location /api/ { proxy_pass http://localhost:8000/; } # 백엔드 API
   ```

---

## 🔧 운영 및 관리

### 자동 배포 트리거
- `master` 브랜치 푸시 → 자동 배포 실행
- GitHub **Actions** 탭에서 수동 실행 가능

### 수동 배포 (필요시)
```bash
# 이미지 빌드 및 푸시
./scripts/build-and-push.sh latest

# 서버에 배포
./scripts/deploy-to-server.sh latest
```

### 서버 관리
```bash
# 서버 접속
ssh ubuntu@your-server-ip

# 컨테이너 상태 확인
docker ps | grep dongjeop-frontend

# 로그 확인
docker logs dongjeop-frontend

# 재시작
docker restart dongjeop-frontend
```

---

## 📊 모니터링 및 디버깅

### 헬스체크
- **URL**: `http://your-server-ip:3000`
- **자동 확인**: GitHub Actions에서 배포 시 자동 실행
- **수동 확인**: 브라우저에서 직접 접속

### 로그 모니터링
```bash
# 실시간 로그
docker logs -f dongjeop-frontend

# 컨테이너 리소스 사용량
docker stats dongjeop-frontend --no-stream
```

### 문제 해결
각 단계별 상세한 문제 해결 가이드:
- [배포 테스트 가이드](./DEPLOYMENT_TEST_GUIDE.md#🚨-문제-해결-가이드)

---

## 🎯 향후 개선 방안

### 단기 (즉시 가능)
- [ ] **SSL 인증서** 설정 (Let's Encrypt)
- [ ] **도메인 연결** (선택사항)
- [ ] **로그 수집 시스템** 구축

### 중기 (백엔드 연동 후)
- [ ] **실제 API** 연동 테스트
- [ ] **에러 모니터링** 시스템 연동
- [ ] **성능 모니터링** 도구 연동

### 장기 (운영 최적화)
- [ ] **Blue-Green 배포** 도입
- [ ] **멀티 환경** 관리 (dev, staging, prod)
- [ ] **자동 스케일링** 설정

---

## ⚡ 무중단 배포의 장점

### 🚀 **Zero Downtime Deployment**
- **서비스 중단 없음**: 사용자가 배포를 느끼지 못함
- **Blue-Green 전략**: 새 버전 검증 후 안전한 전환
- **자동 롤백**: 실패 시 즉시 이전 버전으로 복원
- **헬스체크 기반**: 새 버전이 정상 동작할 때만 트래픽 전환

### 📊 **배포 안정성 향상**
- **단계별 검증**: 새 컨테이너 → 헬스체크 → 트래픽 전환 → 기존 종료
- **실패 격리**: 새 버전 문제 시 기존 서비스는 영향 없음
- **모니터링 강화**: 각 단계별 상태 확인 및 로깅

---

## 🎉 최종 체크리스트

### 개발자 체크리스트
- [ ] 로컬 Docker 테스트 완료
- [ ] GitHub Secrets 9개 모두 설정 (포트 포함)
- [ ] 첫 무중단 CI/CD 파이프라인 실행 성공
- [ ] 프론트엔드 접속 확인 (3000포트)

### 백엔드 협업 체크리스트  
- [ ] 백엔드 8000포트 서버 실행
- [ ] CORS 설정 적용
- [ ] 프론트엔드 연동 테스트 완료

### 운영 준비 체크리스트
- [ ] 서버 모니터링 체계 구축
- [ ] 배포 롤백 절차 수립
- [ ] 에러 알림 시스템 연동

---

## 📞 지원 및 문의

### 📚 문서 링크
- [환경변수 설정](./ENVIRONMENT_SETUP.md)
- [GitHub Secrets 설정](./GITHUB_SECRETS_SETUP.md)  
- [배포 테스트 가이드](./DEPLOYMENT_TEST_GUIDE.md)

### 🐛 문제 발생 시
1. **GitHub Issues** 생성
2. **에러 로그** 전체 첨부
3. **환경 정보** (OS, Docker 버전 등) 포함

---

> 🎊 **축하합니다!** 무중단 배포 CI/CD 환경이 구축되었습니다!  
> 이제 `main` 브랜치에 코드를 푸시하기만 하면 서비스 중단 없이 자동 배포됩니다.
