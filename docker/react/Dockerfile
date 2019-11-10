FROM node:alpine

RUN mkdir -p /app_base

COPY docker/react/next.config.js package.json package-lock.json docker/.env.example /app_base/
COPY react/ /app_base/react/
COPY shared/   /app_base/shared/
COPY config/   /app_base/config/

WORKDIR /app_base

RUN echo -n "npm install..." && \
  npm install --only=prod &>/dev/null && \
  echo "done" && \
  npm run copy_env_example && \
  npx next telemetry disable && \
  npm run build && \
  npm cache clean --force &>/dev/null

CMD ["npm", "run", "react:pro"]
