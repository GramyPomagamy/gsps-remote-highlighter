# Node 22 is the current LTS version
FROM node:22-alpine as build
WORKDIR /app

COPY package.json ./
RUN npm install

COPY src/ src/
COPY tsconfig.json ./
RUN npm run build
RUN npm run css-build


FROM node:22-alpine as app
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY views/ views/
COPY public/ public/
COPY --from=build /app/app.js ./
COPY --from=build /app/public/css/styles.css ./public/css/

CMD ["node", "app.js"]
