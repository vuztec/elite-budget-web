# Stage 1: Build
FROM node:18 as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application with increased memory
RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build

# Stage 2: Production
FROM node:18 as production

# Set working directory
WORKDIR /app

# Copy build output from the previous stage
COPY --from=build /app/dist ./dist

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Expose port 3000
EXPOSE 3000

# Serve the application
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
