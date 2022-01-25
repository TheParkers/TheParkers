FROM node:16-alpine as build
RUN apk add chromium
WORKDIR /app
ENV HOST 0.0.0.0
ENV PORT 80
ENV CHROME_BIN /usr/bin/chromium-browser

COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
RUN npm run testdocker

RUN ionic build
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/