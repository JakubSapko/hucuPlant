# FROM node:16.15.1

# WORKDIR /var/app

# COPY package*.json ./
# COPY prisma ./prisma/

# RUN npm ci

# COPY . .

# EXPOSE 3000
# CMD ["npm", "run", "start:dev"]


FROM node:16.15.1 AS builder

# Create app directory
WORKDIR /var/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm ci

COPY . .

RUN npm run build

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]