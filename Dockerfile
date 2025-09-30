FROM node:22 as base

WORKDIR /app

RUN npm install -g corepack && corepack enable && corepack prepare pnpm@8.6.1 --activate

ENV CI=true

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --reporter=silent

COPY . .
COPY .env.dev .env

# Copy entrypoint and make executable
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["pnpm", "dev"]
