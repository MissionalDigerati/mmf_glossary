# Use nginx alpine for a lightweight image
FROM nginx:alpine

# Copy the HTML files to nginx's default public directory
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Copy custom nginx configuration if needed
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
