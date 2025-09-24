# =============================================================================
# 🐳 동접 프론트엔드 Docker 이미지 (멀티스테이지 빌드)
# Next.js 15 + Node.js 22 최적화 설정
# =============================================================================

# ----- Stage 1: Dependencies (의존성 설치) -----
FROM node:22-alpine AS deps
WORKDIR /app

# 패키지 매니저 최적화
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    corepack prepare npm@latest --activate

# 의존성 설치 (package-lock.json을 활용한 캐시 최적화)
COPY package.json package-lock.json ./
RUN npm ci --only=production --silent

# ----- Stage 2: Builder (빌드) -----
FROM node:22-alpine AS builder
WORKDIR /app

# 개발 의존성 포함 설치
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    corepack prepare npm@latest --activate

COPY package.json package-lock.json ./
RUN npm ci --silent

# 소스 코드 복사
COPY . .

# Next.js 텔레메트리 비활성화 (빌드 성능 향상)
ENV NEXT_TELEMETRY_DISABLED=1

# 프로덕션 빌드 실행
RUN npm run build

# ----- Stage 3: Runner (실행 환경) -----
FROM node:22-alpine AS runner
WORKDIR /app

# 프로덕션 환경 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 시스템 사용자 생성 (보안 강화)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Next.js 실행에 필요한 파일들만 복사
COPY --from=builder /app/public ./public

# Next.js 빌드 결과물 복사 (소유권 설정)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# nextjs 사용자로 전환
USER nextjs

# 포트 노출
EXPOSE 3000

# Health check (컨테이너 상태 모니터링)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000 || exit 1

# 애플리케이션 실행
CMD ["node", "server.js"]

# =============================================================================
# 빌드 명령어 예시:
# docker build -t dongjeop-front .
# docker run -p 3000:3000 --name dongjeop-front dongjeop-front
# =============================================================================
