FROM node:16-alpine as build
WORKDIR /app
ENV HOST 0.0.0.0
ENV PORT 80

COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
#RUN npm run-script build:prod
RUN npm run testdocker
RUN ionic build
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/