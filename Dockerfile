FROM node:20-slim

WORKDIR /home/app
COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]