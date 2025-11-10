# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json tsconfig*.json nest-cli.json ./
RUN npm ci
COPY src ./src
RUN npm run build

# ---------- Production stage ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/main.js"]
