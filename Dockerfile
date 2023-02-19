# Use Node 18
FROM node:18

# App runs on port 3000
EXPOSE 3000

WORKDIR /gsps-remote-highlighter

COPY . .

# Install npm deps
RUN npm install

# Build stuff
COPY tsconfig.json ./
RUN npm run build
RUN npm run css-build

# Run server
CMD ["node", "app.js"]