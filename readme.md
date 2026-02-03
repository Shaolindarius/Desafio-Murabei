# 📚 Gerenciador de Biblioteca - Teste Técnico MuraBei

Este projeto é uma aplicação Full Stack para gerenciamento de livros, desenvolvida para o processo seletivo da **MuraBei**. A solução utiliza **Next.js** no frontend, **Flask** no backend e é totalmente containerizada com **Docker**.

## Funcionalidades

- **Listagem Dinâmica:** Visualização de todos os livros cadastrados no backend.
- **Cadastro de Livros:** Adição de novos títulos com atualização em tempo real
- **Busca Integrada:** Filtro de livros por título ou autor diretamente na interface.
- **Remoção de Livros:** Exclusão de registros com atualização de estado no frontend.
- **Containerização:** Ambiente isolado e pronto para execução via Docker Compose.

## Tecnologias Utilizadas

- **Frontend:** [Next.js 15](https://nextjs.org/), React, Tailwind CSS, Lucide React e componentes [Shadcn/UI](https://ui.shadcn.com/).
- **Backend:** [Python 3.12](https://www.python.org/), Flask, Flask-CORS.
- **Infraestrutura:** Docker e Docker Compose.

## Como Rodar o Projeto

Para executar a aplicação, você precisará ter o [Docker](https://www.docker.com/) instalado em sua máquina.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Shaolindarius/Desafio-Murabei.git](https://github.com/Shaolindarius/Desafio-Murabei.git)

2. **Build do Backend:**
   Navegue até a pasta `backend` e execute o script de build:
   ```bash
   cd backend
   ./build.bash

3. **Subir os servicos:**
   cd ../_docker-compose
    ./docker-up.bash 

4. **Acesso as Aplicacoes:**
   - **Frontend**- http://localhost:3000
   - **Backend** - http://127.0.0.1:5000/books

## Estrutura do Projeto
- `/frontend`: Aplicação Next.js com os componentes de interface e Shadcn/UI.
- `/backend`: API Flask em Python que gerencia os dados dos livros.
- `/_docker-compose`: Scripts de automação e orquestração do ambiente.