FROM ubuntu 
FROM node:latest
EXPOSE 3000
COPY . . 
ENTRYPOINT npm start

