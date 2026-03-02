# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
# Copy built static files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Note: For react-router support in Nginx, a custom nginx.conf is usually needed, 
# but for simplicity we rely on standard hosting here.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
