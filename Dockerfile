# ----- 빌드 단계 -----
# node:16 이미지를 기반으로 빌드 환경을 구성합니다.
FROM node:16 AS builder

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 의존성 설치 최적화를 위해 package.json과 yarn.lock 파일만 먼저 복사합니다.
COPY package.json yarn.lock ./

# Yarn을 사용하여 의존성을 설치합니다.
RUN yarn install

# 소스 전체를 복사합니다.
COPY . .

# Next.js 앱을 빌드합니다.
# 빌드 결과는 .next 디렉토리에 생성됩니다.
RUN yarn build

# ----- 런타임 단계 -----
# 가볍고 최적화된 node:16-alpine 이미지를 사용합니다.
FROM node:16-alpine

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 빌드 단계에서 생성된 결과물을 런타임 이미지로 복사합니다.
# .next 디렉토리: 빌드 산출물
# node_modules: 의존성 모듈들
# package.json: 앱 정보
# public: 정적 파일들
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# Next.js 앱이 사용하는 포트(예: 3000번)를 외부에 노출합니다.
EXPOSE 3000

# 컨테이너가 시작될 때, "yarn start" 명령어를 실행하여 앱을 실행합니다.
CMD ["yarn", "start"]
