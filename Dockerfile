# ===================================
# BASE
# ===================================
FROM oven/bun:1 AS base
WORKDIR /app
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --no-save --frozen-lockfile

# ===================================
# BUILDER
# ===================================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_PATH=/app/data/sqlite.db

RUN mkdir -p /app/data
RUN bun drizzle:migrate && \
    test -f /app/data/sqlite.db

RUN bun run build

# ===================================
# RUNNER
# ===================================
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"
ENV DATABASE_PATH=/app/data/sqlite.db

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --no-log-init -g nodejs nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/data /app/data

USER nextjs

EXPOSE 3000

CMD ["bun", "./server.js"]