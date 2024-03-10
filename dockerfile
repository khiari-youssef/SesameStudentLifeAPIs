FROM node:18-alpine
RUN mkdir -p /usr/src/sesameapisapp
WORKDIR /usr/src/sesameapisapp
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start"]