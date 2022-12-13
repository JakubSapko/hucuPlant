# FROM node:lts

# WORKDIR /usr/src/backend

# COPY package*.json ./

# RUN npm install

# COPY . .
# EXPOSE 8000

# RUN npx prisma generate
# CMD ["npm", "run", "dev"]

FROM node:lts
RUN npm install -g nodemon
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install && mv /usr/src/app/node_modules /node_modules
COPY . /usr/src/app
EXPOSE 8080
CMD [ "nodemon" ]