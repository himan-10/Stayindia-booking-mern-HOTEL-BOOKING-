FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

# Run as non-root user for security
USER node

EXPOSE 5000

CMD ["node", "src/server.js"]
