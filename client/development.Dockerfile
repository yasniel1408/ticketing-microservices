FROM node:18.4.0-alpine

COPY ["./package.json", "./package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

RUN npm install -g npm@9.6.2

COPY ["./", "/usr/src/"]

EXPOSE 3000

CMD ["npm", "run", "dev"]
