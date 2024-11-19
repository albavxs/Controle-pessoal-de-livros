# Use a versão oficial do Node.js como base
FROM node:20

# Definir diretório de trabalho dentro do contêiner
WORKDIR /Back-end

# Copiar package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código da aplicação para dentro do contêiner
COPY . .

# Expor a porta do servidor (ajuste conforme necessário, ex: porta 5000)
EXPOSE 3001


CMD ["npm", "start"]
