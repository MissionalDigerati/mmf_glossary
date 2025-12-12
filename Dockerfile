# Use nginx alpine for a lightweight image
FROM nginx:alpine

# Copy the HTML files to nginx's default public directory
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY data/ /usr/share/nginx/html/data/
COPY fonts/ /usr/share/nginx/html/fonts/
COPY img/ /usr/share/nginx/html/img/
COPY js/ /usr/share/nginx/html/js/
COPY favicon.ico /usr/share/nginx/html/
COPY favicon.png /usr/share/nginx/html/
COPY apple-touch-icon*.png /usr/share/nginx/html/

# Copy custom nginx configuration if needed
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
