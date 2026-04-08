FROM node:20-alpine

WORKDIR /app

# System dependencies needed for native modules
RUN apk add --no-cache python3 make g++ dumb-init curl

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install --legacy-peer-deps

# Explicitly install build tools (needed for medusa build step)
RUN npm install --save-dev ts-node typescript @swc/core @swc/jest --legacy-peer-deps

# Copy source files
COPY . .

# Build Medusa (requires dummy env vars at build time)
RUN touch .env && \
    NODE_ENV=development \
    DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy?sslmode=disable \
    REDIS_URL=redis://localhost:6379 \
    npx medusa build

ENV NODE_ENV=production

EXPOSE 9000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npx", "medusa", "start"]
