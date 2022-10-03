FROM node:latest

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000/tcp

RUN addgroup --system frontend && adduser --system --ingroup frontend --disabled-password frontend 
USER frontend:frontend

ENTRYPOINT yarn start

