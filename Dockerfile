FROM node:16.18.1

WORKDIR /srs

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run dev
EXPOSE 3000
CMD ["npm", "run", "dev"]