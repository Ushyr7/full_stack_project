FROM node:14

WORKDIR /client
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

CMD ["sh", "-c", "npm run start"]