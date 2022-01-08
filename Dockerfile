FROM node:fermium-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD node ./bin/www