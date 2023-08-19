# Check out https://hub.docker.com/_/node to select a new base image
# FROM node:16-slim
FROM node:alpine3.11

# Set to a non-root built-in user `node`
# USER node

# Create app directory (with user `node`)
# RUN mkdir -p /home/node/app
# WORKDIR /home/node/app
WORKDIR /usr/code
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY --chown=node package*.json ./
COPY package*.json ./
RUN npm install

# Bundle app source code
# COPY --chown=node . .
COPY . .
RUN npm run rebuild
RUN npm run 
# RUN npm run migrate
# Bind to all network interfaces so that it can be mapped to the host OS
# ENV HOST=0.0.0.0 PORT=3000
EXPOSE 4000

# EXPOSE ${PORT}
# CMD [ "node", "index.js" ]
CMD [ "npm", "run", "test:prod" ]
