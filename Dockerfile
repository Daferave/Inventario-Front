FROM nginx:alpine

COPY build/ /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf