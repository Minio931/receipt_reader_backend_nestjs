# ===================== base =====================
FROM node:20-slim AS base
WORKDIR /app
ENV PORT=3000
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates tini procps\
 && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/tini","--"]

# ===================== development =====================
FROM base AS development
ENV NODE_ENV=development
WORKDIR /app
COPY . .
CMD ["npm","run","start:dev"]

# ===================== build (kompilacja TS + odchudzenie deps) =====================

FROM base AS build
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# ===================== production (lekki runtime) =====================
FROM node:20-slim AS production
WORKDIR /app
ENV NODE_ENV=production PORT=3000
RUN useradd -m -u 10001 nodeusr
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

USER nodeusr
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node","dist/main.js"]
