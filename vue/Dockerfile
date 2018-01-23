FROM node:9.4.0

WORKDIR /deploy

VOLUME [ '/deploy/dist' ]

COPY package.json ./

RUN npm install

COPY . .

CMD ['yarn', 'build']
