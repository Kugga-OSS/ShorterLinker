# ShorterLinker

> A free short link service. Site :  http://sl.ayang818.top

## Dependencies
1. TypeScript
2. node
4. MySQL
5. Redis
6. Docker

## How to run
**Install typescript**
```bash
npm install -g typescript
```

**Install necessary dependencies** 
```bash
npm install
```

Before running, make sure you have already started a MySQL Server(and created a database for this project) and a Redis Server.

Execute `db.sql` in your MySQL.

**Run with node**
```bash
npm run serve
```

**Run with docker**

Build a docker image
```bash
docker build -t imageName:version .
```
Run a docker container
```bash
docker run -d --name myapp -p 3000:3000 -e REDIS_HOST=xxx -e REDIS_PASS=xxx -e REDIS_PORT=xxx -e MYSQL_HOST=xxx -e MYSQL_PORT=xxx -e MYSQL_USER=xxx -e MYSQL_PASSWORD=xxx -e MYSQL_DB=xxx imageName:version
```

