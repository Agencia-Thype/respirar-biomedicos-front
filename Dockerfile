# Estágio de construção
FROM node:14 AS build

WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro para otimizar o cache
COPY package.json package-lock.json nginx.conf ./
RUN npm install

# Copiar o restante do código após instalar dependências
COPY . ./
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar a build gerada para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Opcional: Copiar configuração personalizada do Nginx, se necessário
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta padrão do Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
