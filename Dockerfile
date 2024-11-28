FROM node:20.11-alpine as dependencies
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/*/package.json ./apps/*/
COPY packages/*/package.json ./packages/*/
RUN pnpm install --no-frozen-lockfile 

FROM node:20.11-alpine as builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN ls -l ./apps/host/public
COPY --from=dependencies /app/node_modules ./node_modules
# COPY --from=dependencies /app/apps/host/node_modules ./apps/host/node_modules
# COPY --from=dependencies /app/apps/admin/node_modules ./apps/admin/node_modules
# COPY --from=dependencies /app/packages/shared/node_modules ./packages/shared/node_modules
# temporary, for some reason there is no local node_modules being created in the dependencies stage (?)
WORKDIR /app/apps/host
RUN pnpm install
WORKDIR /app/apps/admin
RUN pnpm install
WORKDIR /app/packages/shared
RUN pnpm install
WORKDIR /app
RUN pnpm build:production

FROM node:20.11-alpine as runner
WORKDIR /app
RUN npm install -g pnpm
ENV NODE_ENV production
RUN whoami && ls -l /app/apps
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
