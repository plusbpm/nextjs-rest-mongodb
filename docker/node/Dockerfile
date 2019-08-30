FROM node:alpine

RUN mkdir -p /app_base

COPY package.json package-lock.json /app_base/

WORKDIR /app_base

RUN npm install --only=prod

CMD ["npm", "run", "dev"]
