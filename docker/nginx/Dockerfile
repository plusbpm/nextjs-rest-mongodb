FROM nginx:stable-alpine

RUN mkdir -p /static && \
  mkdir -p /etc/nginx/vhosts && \
  echo -n "Install packages ..." && \
  apk add --no-cache dumb-init > /dev/null && \
  echo " done"

COPY docker/nginx/*.conf /etc/nginx/
COPY static/ /static/

ENTRYPOINT ["dumb-init", "--"]

CMD nginx -g 'daemon off;'
