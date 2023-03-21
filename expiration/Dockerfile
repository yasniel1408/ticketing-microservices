FROM node:18.4.0-alpine

COPY ["./package.json", "./package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install --only=prod

COPY ["./", "/usr/src/"]

EXPOSE 3000

CMD ["npm", "start"]
