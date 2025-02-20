FROM node:20 AS setup

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25-alpine AS release

WORKDIR /usr/src/app

# Not entirely sure how frontend is able to access /frontend/data files, but it seems to be working even after removing images and rebuilding.

COPY --from=setup /usr/src/app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]