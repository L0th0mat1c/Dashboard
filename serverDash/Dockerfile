FROM node:12
WORKDIR /home/node/serverDash 
COPY server /home/node/serverDash
RUN npm uninstall bcrypt
RUN npm install bcrypt@latest --save
RUN npm install

CMD node dashboard.js