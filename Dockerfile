FROM node:16.16

ENV NODE_VERSION 16.16.0

WORKDIR /app

# copies our local package.json file to the container
COPY ./package*.json ./

# install dependencies first for caching purposes
RUN npm install --silent
RUN npm install -location=global react-scripts@5.0.1

# copies our local files to the container except wtv is in .dockerignore file
COPY . .

CMD ["npm", "start"]