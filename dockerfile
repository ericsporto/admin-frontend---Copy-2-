FROM node:lts
# WORKDIR /usr/src/app
WORKDIR /admin-frontend
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3002
CMD ["yarn", "run", "dev"]

