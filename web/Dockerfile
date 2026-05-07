# ----------------------------
# Base image
# ----------------------------
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# ----------------------------
# Dependencies
# ----------------------------
FROM base AS deps

COPY web/package.json web/package-lock.json* ./
RUN npm ci

# ----------------------------
# Builder
# ----------------------------
FROM base AS builder

WORKDIR /app

ARG NEXT_PUBLIC_SERVER_URL=http://localhost:8010
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY web/ .

# Build Next.js
RUN npm run build

# ----------------------------
# Runner (Production)
# ----------------------------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat openssl

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy Next standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Allow Next.js to write cache at runtime
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3010
ENV PORT=3010

CMD ["node", "server.js"]