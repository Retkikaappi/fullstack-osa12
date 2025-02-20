FROM node:20 AS setup

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

RUN npx tsc

FROM node:20

WORKDIR /usr/src/app

COPY --from=setup /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=setup /usr/src/app/dist ./dist
COPY --from=setup /usr/src/app/data ./data

RUN npm ci --only=production

USER node

CMD ["npm", "start"]