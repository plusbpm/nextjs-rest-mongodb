FROM node:alpine

RUN mkdir -p /app_base

COPY package.json package-lock.json docker/.env.example /app_base/
COPY back-end/ /app_base/back-end/
COPY shared/   /app_base/shared/
COPY config/   /app_base/config/

WORKDIR /app_base

RUN echo -n "npm install..." && \
  npm install --only=prod &>/dev/null && \
  npm install faker &>/dev/null && \
  echo "done" && \
  npm run copy_env_example && \
  npm cache clean --force &>/dev/null

CMD ["npm", "run", "backend:pro"]
