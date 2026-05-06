FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose API port
EXPOSE 4000

# Start server
CMD ["npm", "start"]