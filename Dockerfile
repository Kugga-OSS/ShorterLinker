FROM node:12

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["npm", "run", "serve"]

EXPOSE 3000