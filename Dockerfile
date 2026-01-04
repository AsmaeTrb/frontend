FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/tp4/ /usr/share/nginx/html/
EXPOSE 80
