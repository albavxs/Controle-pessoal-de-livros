# Use a versão oficial do Node.js como base
FROM node:14

# Definir diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código da aplicação para dentro do contêiner
COPY . .

# Expor a porta do servidor (ajuste conforme necessário, ex: porta 5000)
EXPOSE 3000


CMD ["npm", "start"]
