# base image
FROM node:12.2.0-alpine

WORKDIR /home/node/serverFront
COPY dashboard /home/node/serverFront
RUN npm install
RUN npm install @vue/cli@3.7.0 -g

# start app
CMD ["npm", "run", "serve"]
