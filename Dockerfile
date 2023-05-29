# STAGE: Development
FROM node:14-alpine3.13 AS dev
RUN apk update && apk add bash && apk add make && apk add python3
EXPOSE 3000
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . /app/
CMD ["npm", "run", "dev"]
