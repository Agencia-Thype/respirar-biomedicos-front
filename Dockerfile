# Estágio de construção
FROM node:14 AS build

WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro para otimizar o cache
COPY package.json package-lock.json .htaccess ./
RUN npm install

# Copiar o restante do código após instalar dependências
COPY . ./
RUN npm run build

# Estágio de produção
FROM httpd:alpine

# Copiar a build gerada para o diretório padrão do Apache
COPY --from=build /app/dist /usr/local/apache2/htdocs

# Opcional: Copiar configuração personalizada do Apache, se necessário
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Expor a porta padrão do Apache
EXPOSE 80

CMD ["httpd-foreground"]
