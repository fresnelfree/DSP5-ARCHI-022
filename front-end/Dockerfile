# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim
# FROM node:alpine3.11

WORKDIR /usr/code
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./
RUN npm install

# Bundle app source code
COPY . .

# Bind to all network interfaces so that it can be mapped to the host OS
# ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${APP_PORT}

CMD [ "npm", "start" ]
