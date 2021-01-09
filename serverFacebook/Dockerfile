FROM node:12
WORKDIR /home/node/serverFacebook
COPY server /home/node/serverFacebook
RUN npm uninstall bcrypt
RUN npm install bcrypt@latest --save
RUN npm install

CMD node facebook.js