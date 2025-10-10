# =============================================================================
# 🚀 동접 프론트엔드 고성능 Docker 이미지 (최적화된 멀티스테이지)
# Next.js 15 + Node.js 22 + BuildKit 고급 기능 활용
# =============================================================================

# syntax=docker/dockerfile:1
FROM node:22-alpine AS base

# 🔧 시스템 최적화 및 패키지 매니저 설정
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    corepack prepare npm@latest --activate

# ----- Stage 1: 의존성 설치 및 빌드 (통합 최적화) -----
FROM base AS builder
WORKDIR /app

# 🌍 빌드 시점 환경변수 주입
ARG NODE_ENV=production
ARG NEXT_PUBLIC_BUILD_ID
ARG NEXT_PUBLIC_LABEL_IMAGE_BASE_URL

# Next.js 성능 최적화
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_BUILD_ID=$NEXT_PUBLIC_BUILD_ID
ENV NEXT_PUBLIC_LABEL_IMAGE_BASE_URL=$NEXT_PUBLIC_LABEL_IMAGE_BASE_URL

# 📦 package.json 복사 및 의존성 설치 (캐시 최적화)
COPY package.json package-lock.json ./

# 🚀 BuildKit 캐시 마운트를 활용한 초고속 의존성 설치
RUN --mount=type=cache,target=/root/.npm \
    npm ci --silent

# 📁 소스 코드 복사 (최소한의 필요 파일만)
COPY . .

# 🏗️ 프로덕션 빌드 실행 (BuildKit 캐시 활용)
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# ----- Stage 2: 최적화된 런타임 환경 -----  
FROM base AS runner
WORKDIR /app
ARG NEXT_PUBLIC_LABEL_IMAGE_BASE_URL

# 🚀 프로덕션 환경 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_LABEL_IMAGE_BASE_URL=$NEXT_PUBLIC_LABEL_IMAGE_BASE_URL

# 🛡️ 보안 강화: 시스템 사용자 생성 + 헬스체크 도구 설치 (한 번에)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    apk add --no-cache --virtual .health-deps wget && \
    apk del .health-deps || true

# 📁 정적 파일 복사 (public 폴더)
COPY --from=builder /app/public ./public

# 🎯 Next.js 최적화된 빌드 결과물 복사 (standalone 모드)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 🔐 보안: 비권한 사용자로 실행
USER nextjs

# 🌐 컨테이너 내부 포트 노출 (Next.js 기본 포트)
EXPOSE 3000

# 🏥 헬스체크 (컨테이너 내부 포트 사용)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider --timeout=2 http://127.0.0.1:3000 || exit 1

# 🚀 애플리케이션 실행
CMD ["node", "server.js"]