FROM node:15.11.0-alpine3.13

COPY src /app

WORKDIR /app

RUN addgroup -S -g 1001 user && \
    adduser -S -u 1001 -G user user && \
    chown user:user /app && \
    chown -R user:user /usr/local/lib/node_modules

USER user

CMD node index.js
