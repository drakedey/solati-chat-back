FROM node:12
WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "./wait.sh", "db:5432", "--" , "node", "server.js" ]
