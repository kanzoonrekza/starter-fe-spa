FROM node:24-slim AS build
WORKDIR /src
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG VITE_API_URL=
RUN pnpm build

FROM nginx:alpine
COPY --from=build /src/dist /usr/share/nginx/html
RUN printf 'server{listen 80;root /usr/share/nginx/html;location /{try_files $uri /index.html;}}' > /etc/nginx/conf.d/default.conf
