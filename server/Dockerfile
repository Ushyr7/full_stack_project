FROM node:14

WORKDIR /server
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD ["sh", "-c", "node ."]