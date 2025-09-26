# 🏗️ 간단한 Docker 빌드 가이드

## 🎯 실용적인 빌드 방법

### **로컬 테스트용**
```bash
npm run docker:build
npm run docker:run
```

### **서버 배포용 (ARM64)**
```bash
npm run docker:build:arm64
docker save dongjeop-frontend:arm64 -o dongjeop-frontend-arm64.tar
```

## 🚀 배포 방식

### **현재 (수동 배포)**
1. ARM64 이미지 빌드
2. tar 파일로 저장
3. 서버에 업로드
4. docker load & 실행

### **미래 (자동 배포)**
- GitHub Actions가 ARM64 이미지를 레지스트리에 푸시
- 서버에서 자동으로 풀 & 배포

## 🔧 CI/CD 설정

### **CI (코드 품질 검사)**
- 포맷팅, 린팅, 타입 체크, 빌드 테스트
- 메모리 최적화 설정 포함

### **배포 (ARM64 전용)**
- 서버 환경에 최적화된 ARM64 이미지
- 빌드 캐시로 속도 향상

---

**결론**: 복잡한 Multi-Architecture 설정 대신 **실제 서버 환경(ARM64)**에 최적화된 단순하고 효율적인 빌드 시스템! 🎉
