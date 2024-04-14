FROM node:14-buster

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

ENV NODE_ENV production

CMD ["npm", "start"]
