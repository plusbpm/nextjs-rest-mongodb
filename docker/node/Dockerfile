FROM node:alpine

RUN mkdir -p /app_base

COPY env.sh package.json package-lock.json server.js /app_base/

WORKDIR /app_base

RUN npm install --only=prod

CMD ["npm", "run", "dev"]
