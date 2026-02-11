FROM node:20-alpine
WORKDIR /app
COPY index.html app.js package.json ./
USER node
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "app.js"]
