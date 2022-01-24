FROM node:16-alpine as build
WORKDIR /app
ENV HOST 0.0.0.0
ENV PORT 80

COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
CMD ionic serve --port=80 --host=0.0.0.0