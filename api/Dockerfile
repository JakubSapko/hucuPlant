FROM node:18.1.0-alpine3.14 

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# RUN npm run build

# FROM node:18.1.0-alpine3.14

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
