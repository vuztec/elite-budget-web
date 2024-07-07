# Use a node base image
FROM node

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application
COPY . .

# Increase memory limit for the build process and run the build command
RUN node --max-old-space-size=4096 node_modules/.bin/vite build

# Copy the built React application from the previous stage
# COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Command to serve the application
CMD ["npm", "run", "preview"]
