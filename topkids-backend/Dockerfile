FROM node:10

RUN cd ~ && mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api


COPY package.json yarn.* ./

COPY .env ./
COPY .env.testing ./



USER node
COPY --chown=node:node . .

RUN npm install

#RUN node ace migration:run --force ou
## Rodando toda a API com o docker e docker-compose
# docker exec -it giftcards  node ace migration:run --force


EXPOSE 3333

CMD [ "npm", "start" ]
