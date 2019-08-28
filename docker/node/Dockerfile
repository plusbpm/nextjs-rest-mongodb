FROM node:alpine

RUN mkdir -p /app_base

COPY package.json package-lock.json server.js /app_base/

WORKDIR /app_base

RUN npm install

CMD npm run dev
