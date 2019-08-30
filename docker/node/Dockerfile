FROM node:alpine

RUN mkdir -p /app_base

COPY package.json package-lock.json /app_base/

WORKDIR /app_base

RUN echo -n "npm install..." && \
    npm install --only=prod &>/dev/null && \
    echo "done"

CMD ["npm", "run", "dev"]
