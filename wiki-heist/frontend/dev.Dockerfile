FROM node:20

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://backend-dev-testing:3000

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]