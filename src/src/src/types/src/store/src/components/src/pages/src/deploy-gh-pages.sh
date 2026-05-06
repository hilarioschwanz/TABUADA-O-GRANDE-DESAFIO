#!/bin/bash

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════╗"
echo "║     🚀 DEPLOY PARA GITHUB PAGES - TABUADA       ║"
echo "╚══════════════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Instale o Node.js primeiro.${NC}"
    exit 1
fi

# Pegar informações do GitHub
echo -e "${YELLOW}📝 Configuração do GitHub${NC}"
read -p "Seu usuário GitHub: " GITHUB_USER
read -p "Nome do repositório (ex: desafio-tabuada): " REPO_NAME

# Atualizar package.json com o homepage correto
echo -e "${YELLOW}⚙️ Configurando package.json...${NC}"
sed -i '' "s/\"homepage\":.*/\"homepage\": \"https:\/\/$GITHUB_USER.github.io\/$REPO_NAME\",/" package.json 2>/dev/null || \
sed -i "s/\"homepage\":.*/\"homepage\": \"https:\/\/$GITHUB_USER.github.io\/$REPO_NAME\",/" package.json

# Atualizar vite.config.ts com o base correto
echo -e "${YELLOW}⚙️ Configurando vite.config.ts...${NC}"
sed -i '' "s/base:.*/base: '\/$REPO_NAME\/',/" vite.config.ts 2>/dev/null || \
sed -i "s/base:.*/base: '\/$REPO_NAME\/',/" vite.config.ts

# Instalar gh-pages se não existir
if ! npm list gh-pages --depth=0 &> /dev/null; then
    echo -e "${YELLOW}📦 Instalando gh-pages...${NC}"
    npm install --save-dev gh-pages
fi

# Verificar se é um repositório git
if [ ! -d .git ]; then
    echo -e "${YELLOW}📁 Inicializando git...${NC}"
    git init
fi

# Adicionar remote se não existir
if ! git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}🔗 Conectando ao GitHub...${NC}"
    git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git
fi

# Commit e push
echo -e "${YELLOW}📤 Enviando código para o GitHub...${NC}"
git add .
git commit -m "Deploy Desafio da Tabuada - $(date '+%d/%m/%Y %H:%M')"
git branch -M main
git push -u origin main --force

# Build e deploy
echo -e "${YELLOW}🔨 Buildando o projeto...${NC}"
npm run build

echo -e "${YELLOW}🚀 Implantando no GitHub Pages...${NC}"
npm run deploy

echo -e "${GREEN}✅ DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════╗"
echo "║     🌐 SEU SITE ESTÁ ONLINE EM:                  ║"
echo "║     https://$GITHUB_USER.github.io/$REPO_NAME    ║"
echo "╚══════════════════════════════════════════════════╝"
echo -e "${NC}"
echo -e "${YELLOW}💡 Dica: O site pode levar 1-2 minutos para ficar disponível${NC}"
