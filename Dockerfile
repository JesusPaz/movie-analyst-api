ARG NODE_VER=11.10.0-alpine
FROM node:$NODE_VER as build
ARG WORKDIR=/usr/src/app
WORKDIR $WORKDIR
COPY package*.json ./
RUN npm install
COPY . .
RUN npm test

FROM node:$NODE_VER as release
RUN apk add --update --no-cache curl
ARG WORKDIR=/usr/src/app
WORKDIR $WORKDIR
COPY --from=build $WORKDIR .
HEALTHCHECK --interval=5s \
    --timeout=5s \
    --retries=6 \
    CMD curl -fs http://localhost:3000/ || exit 1
CMD ["npm", "start"]

