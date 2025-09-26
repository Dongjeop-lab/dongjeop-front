# 🐳 프론트엔드 도커 이미지 수동 배포 가이드

## 📋 개요

이미지 레지스트리 구축 전까지 **수동으로** 프론트엔드 도커 이미지를 배포하는 가이드입니다.

## 📦 생성된 파일

- **파일명**: `dongjeop-frontend-final.tar`
- **크기**: 230MB  
- **위치**: 프로젝트 루트 디렉터리
- **특징**: 환경별 자동 API URL 설정

## 🚀 백엔드 팀 배포 가이드

### 1. 이미지 파일 받기

다음 중 한 가지 방법으로 이미지 파일을 전달받으세요:

- **파일 전송**: Slack, 이메일, USB 등으로 `dongjeop-frontend.tar` 파일 전달
- **클라우드 스토리지**: Google Drive, OneDrive 등에 업로드 후 링크 공유
- **Git LFS**: (선택사항) 대용량 파일 추적을 위한 Git LFS 사용

### 2. 도커 이미지 로드

```bash
# 도커 이미지 파일을 도커에 로드
docker load -i dongjeop-frontend-final.tar
```

**출력 예시:**
```
Loaded image: dongjeop-frontend:env-aware
```

### 3. 이미지 확인

```bash
# 로드된 이미지 확인
docker images | grep dongjeop-frontend
```

**출력 예시:**
```
dongjeop-frontend    env-aware    da9fd1487374   5 minutes ago   230MB
```

### 4. 컨테이너 실행 (네트워킹 옵션별)

**📍 현재 설정**: `localhost:8082` (호스트 네트워크 권장)

#### 옵션 1: 호스트 네트워크 사용 (권장 - 간단함)
```bash
# 호스트 네트워크로 실행 (자동으로 localhost:8082 접근)
docker run -d \\
  --name dongjeop-frontend \\
  --network host \\
  dongjeop-frontend:env-aware
```

#### 옵션 2: 환경변수로 직접 지정
```bash
# API URL을 직접 지정하고 싶은 경우
docker run -d \\
  --name dongjeop-frontend \\
  -p 3000:3000 \\
  -e NEXT_PUBLIC_API_URL=http://localhost:8082 \\
  dongjeop-frontend:env-aware
```

#### 옵션 3: 커스텀 API URL 설정
```bash
# 특정 API URL로 실행
docker run -d \\
  --name dongjeop-frontend \\
  -p 3000:3000 \\
  -e NEXT_PUBLIC_API_URL=http://localhost:8082 \\
  dongjeop-frontend:latest
```

### 5. 백엔드와 연결 확인

```bash
# 컨테이너가 정상 실행되는지 확인
docker ps | grep dongjeop-frontend

# 로그 확인
docker logs dongjeop-frontend
```

## 🔗 API 연결 설정

**🎯 자동 환경 감지**: 프론트엔드가 실행 환경에 따라 API URL을 자동으로 결정합니다.

### 🌐 환경별 자동 설정

| 실행 환경 | 자동 설정되는 API URL | 설명 |
|---|---|---|
| **로컬 개발** (`npm run dev`) | `http://61.109.238.45:8082` | 원격 백엔드에 직접 접근 |
| **도커 프로덕션** | `http://localhost:8082` | 호스트의 백엔드에 접근 |
| **환경변수 지정** | `NEXT_PUBLIC_API_URL` 값 사용 | 수동 설정 우선 |

### ✨ 장점
- **개발자 친화적**: 로컬에서 바로 원격 백엔드 테스트 가능
- **배포 간소화**: 도커에서는 자동으로 localhost 사용
- **유연한 설정**: 필요시 환경변수로 언제든 오버라이드

### 테스트 가능한 엔드포인트:
- `GET /api/health` - 서버 상태 확인
- `GET /api/now` - 현재 시간 조회

### 연결 테스트:

1. **프론트엔드 접속**: `http://localhost:3000`
2. **테스트 페이지**에서 API 버튼들 클릭
3. **백엔드 서버**가 `localhost:8082`에서 실행 중이어야 함

## 🛠️ 트러블슈팅

### 포트 충돌 시:
```bash
# 다른 포트로 실행
docker run -d --name dongjeop-frontend -p 3001:3000 dongjeop-frontend:latest
```

### 컨테이너 재시작:
```bash
# 컨테이너 중지 및 제거
docker stop dongjeop-frontend
docker rm dongjeop-frontend

# 다시 실행
docker run -d --name dongjeop-frontend -p 3000:3000 dongjeop-frontend:latest
```

### 이미지 재로드 시:
```bash
# 기존 이미지 제거
docker rmi dongjeop-frontend:latest

# 새 이미지 파일로 다시 로드
docker load -i dongjeop-frontend.tar
```

## 📝 참고사항

- **CORS 설정**: 개발 환경에서는 Next.js 프록시를 사용하여 CORS 문제 해결
- **환경 변수**: 필요 시 `-e` 옵션으로 환경 변수 전달 가능
- **네트워크**: 백엔드 컨테이너와 동일한 Docker 네트워크 사용 권장

## 🚧 이미지 레지스트리 구축 후

이미지 레지스트리가 구축되면 다음과 같이 변경됩니다:

```bash
# 이미지 푸시
docker tag dongjeop-frontend:latest [registry-url]/dongjeop-frontend:latest
docker push [registry-url]/dongjeop-frontend:latest

# 이미지 풀
docker pull [registry-url]/dongjeop-frontend:latest
```

---

## ❓ 문의사항

배포 과정에서 문제가 발생하면 프론트엔드 팀에게 연락 부탁드립니다.

**준비 완료 사항:**
- ✅ 프론트엔드 도커 이미지 빌드 완료
- ✅ `dongjeop-frontend.tar` 파일 생성 완료
- ✅ API 엔드포인트 localhost:8082로 설정 완료
- ✅ 배포 가이드 작성 완료
