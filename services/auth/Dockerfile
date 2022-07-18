FROM node:alpine
WORKDIR /app

COPY ./dist/services/auth .
ENV PORT=3333
EXPOSE $PORT

RUN yarn add reflect-metadata tslib rxjs express

CMD node ./main.js