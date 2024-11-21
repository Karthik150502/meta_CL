FROM node:20.12.0-alpine3.19


WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages


# Install dependencies
RUN npm install
RUN npm install -g pnpm

# 
RUN pnpm run db:generate


RUN pnpm run build


CMD ["pnpm", "run", "start-server"]

