FROM node:alpine 

ADD . /app

# Install dependencies
RUN cd /app; \  
    npm install --production

# Expose our server port.
EXPOSE 8123

# Run our app.
CMD ["node", "/app/index.js"]
