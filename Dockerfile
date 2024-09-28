# Frontend Dockerfile

# Stage 1: install depedencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json .
RUN npm install sharp
RUN npm install --frozen-lockfile

# Stage 2: build
FROM node:18-alpine AS builder
WORKDIR /app
ENV NEXT_PRIVATE_STANDALONE=true
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: run
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/config. ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/.eslintrc.json ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
 
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]