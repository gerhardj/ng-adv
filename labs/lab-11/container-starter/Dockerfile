FROM node:16 as node
LABEL author="Alexander Pajer"
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -c production

##### Stage 2 - Create the run-time-image
FROM nginx:alpine
VOLUME /var/cache/nginx
# Copy from build-image to nginx base folder
COPY --from=node /app/dist/food-app /usr/share/nginx/html
# Copy nginx config
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
