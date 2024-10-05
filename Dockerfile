# Estágio de construção
FROM node:20 AS build

WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro para otimizar o cache
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante do código após instalar dependências
COPY . ./
RUN npm run build

# Estágio de produção
FROM node:14 AS production

WORKDIR /app

# Instalar o 'serve' globalmente no estágio de produção
RUN npm install -g serve

# Copiar os arquivos de build da etapa anterior
COPY --from=build /app/dist /app/dist

# Expor a porta 80 onde o servidor será executado
EXPOSE 80

# Comando para servir a aplicação a partir do diretório dist na porta 80
CMD ["serve", "-s", "dist", "-l", "80"]
