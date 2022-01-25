FROM node:16-alpine as build
WORKDIR /app
ENV HOST 0.0.0.0
ENV PORT 80

COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
#RUN npm run-script build:prod
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get install -y google-chrome-stable
RUN npm run testdev
RUN ionic build
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/