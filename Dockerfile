FROM node:20.11.1
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build-prod
ENV PORT 80
CMD ["node", ".output/server/index.mjs"]