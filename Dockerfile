FROM node:22
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "dev" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
COPY . ./
ENV PORT 8080
EXPOSE $PORT
CMD ["node","index.js"]
