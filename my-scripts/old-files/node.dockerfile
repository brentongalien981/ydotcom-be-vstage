# Use the official Node.js image as base
FROM node:20.12.0-alpine3.19

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 80

CMD ["node", "app.js"]
