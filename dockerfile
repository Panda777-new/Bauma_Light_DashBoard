# Use Node.js LTS version
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only package files first for better Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application files
COPY . .

# Expose the default dev port for Next.js
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]
