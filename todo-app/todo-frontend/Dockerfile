FROM node:20 AS setup-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

FROM nginx:1.25-alpine AS release

COPY --from=setup-stage /usr/src/app/dist /usr/share/nginx/html

FROM setup-stage AS testing

WORKDIR /usr/src/app

COPY --from=setup-stage /usr/src/app /usr/src/app

RUN npm install

RUN npm test
