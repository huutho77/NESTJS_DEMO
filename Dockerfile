FROM node:14.17.0-alpine

LABEL version="1.0.0"
LABEL description="Development image API program manage products by NestJS Framework"

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]