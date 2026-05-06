FROM node:18-alpine AS build

WORKDIR /app

ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Use nginx to serve static files
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]