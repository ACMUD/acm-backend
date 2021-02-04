FROM node:14

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5000

COPY . .

CMD [ "npm", "run", "start" ]