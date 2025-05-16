FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

ARG PORT
# Expose the port the app runs on
EXPOSE ${PORT}

# Define the command to run the application
CMD [ "npm", "start" ]
