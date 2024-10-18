FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npm install python

CMD ["node", "ace", "serve", "--hmr"]