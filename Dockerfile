FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init curl

# Copy pre-built server output (medusa-config.js + package files)
COPY .medusa/server/ ./

# Copy pre-built admin dashboard (must stay at .medusa/client/)
COPY .medusa/client/ ./.medusa/client/

# Install production dependencies
RUN NODE_ENV=production npm install --legacy-peer-deps && npm cache clean --force

ENV NODE_ENV=production

EXPOSE 9000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npx", "medusa", "start"]
