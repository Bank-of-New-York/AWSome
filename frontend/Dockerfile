FROM node:12.18-slim AS build

COPY ./awsome/package.json /app/package.json
COPY ./awsome/package-lock.json /app/package-lock.json

# set the working directory to the docker container folder
WORKDIR /app

# install angular requirements
RUN npm install --slient

COPY ./awsome /app

# generate angular output files
RUN npm run build --prod

ENTRYPOINT ["node", "server.js"]