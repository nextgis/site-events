# Select the image to use
FROM node as build

# Set working dir to /app
WORKDIR /app

## Install dependencies in the root of the Container
COPY package.json yarn.lock ./
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

# Add project files to /app route in Container
ADD . ./
ARG MODE=prod
RUN yarn run build-${MODE}

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html/events
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]