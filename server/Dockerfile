FROM node:22-alpine AS deps
WORKDIR /app

COPY server/package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app

COPY server/package*.json ./
COPY server/tsconfig.json ./
COPY server/src ./src
COPY --from=deps /app/node_modules ./node_modules

# Compile TypeScript and rewrite path aliases (@/*) in emitted files.
RUN npm run build && npm exec --yes tsc-alias -p tsconfig.json

FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8010

RUN apk add --no-cache dumb-init

COPY server/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

USER node
EXPOSE 8010

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
