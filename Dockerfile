FROM node:20.11-alpine as dependencies
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/*/package.json ./apps/*/
COPY packages/*/package.json ./packages/*/
RUN pnpm install --no-frozen-lockfile && ls -al /app/node_modules && ls -al /app/apps/host/node_modules

FROM node:20.11-alpine as builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/host/node_modules ./apps/host/node_modules
COPY --from=dependencies /app/apps/admin/node_modules ./apps/admin/node_modules
COPY --from=dependencies /app/packages/shared/node_modules ./packages/shared/node_modules
RUN pnpm build:production

FROM node:20.11-alpine as runner
WORKDIR /app
RUN npm install -g pnpm
ENV NODE_ENV production
#host app
COPY --from=builder /app/apps/host/next.config.mjs ./apps/host
COPY --from=builder /app/apps/host/public ./apps/host/public
COPY --from=builder /app/apps/host/.next ./apps/host/.next
COPY --from=builder /app/apps/host/node_modules ./apps/host/node_modules
COPY --from=builder /app/apps/host/package.json ./apps/host/package.json
#admin app
COPY --from=builder /app/apps/admin/next.config.mjs ./admin/host
COPY --from=builder /app/apps/admin/public ./apps/admin/public
COPY --from=builder /app/apps/admin/.next ./apps/admin/.next
COPY --from=builder /app/apps/admin/node_modules ./apps/admin/node_modules
COPY --from=builder /app/apps/admin/package.json ./apps/admin/package.json

EXPOSE 3000
CMD ["pnpm", "start"]
