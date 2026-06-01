FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent && npm cache clean --force

COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache dumb-init

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

COPY --from=builder /app/build /usr/share/nginx/html

RUN adduser -D -H -u 1001 -s /bin/nologin www && \
    chown -R www:www /usr/share/nginx/html && \
    chown -R www:www /var/cache/nginx && \
    chown -R www:www /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R www:www /var/run/nginx.pid

USER www

EXPOSE 80

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]