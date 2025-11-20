FROM node:22-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

# Install the application dependencies
RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev", "--watch" ]

FROM node:22-alpine as production-build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies for optimized build
RUN npm ci --omit=development --prefer-offline --no-audit

COPY . .

RUN npm run build:prod

FROM node:22-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=development --prefer-offline --no-audit

COPY . .

COPY --from=production-build /usr/src/app/dist ./dist

CMD [ "npm", "run", "start:prod" ]
