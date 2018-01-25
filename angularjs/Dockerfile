FROM node:9.4.0

WORKDIR /deploy

VOLUME [ '/deploy/build' ]

COPY package.json ./

RUN yarn install

COPY . .

CMD ['yarn', 'build']
