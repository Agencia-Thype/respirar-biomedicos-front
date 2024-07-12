# Estágio de construção
FROM node:14 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

# Estágio de produção
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy nginx configuration
#COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]