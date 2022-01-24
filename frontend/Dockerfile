FROM node:16-alpine as build
WORKDIR /app
ENV HOST 0.0.0.0
ENV PORT 3000

COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/

ENTRYPOINT ["npm"]
CMD ["run", "start"]