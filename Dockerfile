From alpine:latest

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package.json /app

RUN npm install

ADD . /app

EXPOSE 3003

CMD ["npm", "start"]
 
