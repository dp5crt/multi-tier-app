# Use Nginx directly without a build stage for now
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Create a non-root user for security (Keep this for your grade!)
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Copy everything from your local 'web' folder directly into Nginx
# This bypasses the 'npm run build' step to check if the files exist
COPY . .

# Ensure the non-root user has access to the files we just copied
RUN chown -R nginx:nginx /usr/share/nginx/html

USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]