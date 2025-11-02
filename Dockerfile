FROM node:22-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

# Install all dependencies including devDependencies (glob and rimraf are transitive deps)
RUN npm ci --prefer-offline --no-audit

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev", "--watch" ]

FROM node:22-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --prefer-offline --no-audit

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]
