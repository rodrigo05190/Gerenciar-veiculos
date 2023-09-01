# Teste backend node

Este é um projeto para gerenciar veículos, usuários e empresas.

## Início

Para iniciar o projeto, siga as instruções abaixo:

1. Execute o seguinte comando para iniciar os serviços utilizando o Docker Compose:
   docker-compose -f docker-compose.dev.yml up

   Para encerrar os serviços, utilize o seguinte comando:
   docker-compose -f docker-compose.dev.yml down

2. Inicie o servidor de desenvolvimento:
    npm run dev

## Documentação da API
Acesse a documentação da API utilizando Swagger:
http://localhost:3333/api-docs/

## Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:

src\
controllers: Contém os controladores da API para veículos, usuários e empresas.\
database: Inclui configurações e scripts de migração do banco de dados.\
helpers: Contém funções e utilitários auxiliares para o projeto.\
middlewares: Aqui estão os middlewares utilizados na aplicação.\
repositories: Contém os repositórios que interagem com o banco de dados.\
routes: Define as rotas da API para veículos, usuários e empresas.\

Endpoints
Abaixo estão os endpoints disponíveis na API:

Veículos
Atualizar veículo:
PUT /vehicle/update/:id

Criar veículo:
POST /vehicle/create

Obter lista de veículos:
GET /vehicle/

Obter detalhes de um veículo:
GET /vehicle/:id

Remover veículo:
DELETE /vehicle/:id

Empresas
Atualizar empresa:
PUT /companie/update/:id

Criar empresa:
POST /companie/create

Obter lista de empresas:
GET /companie/

Obter detalhes de uma empresa:
GET /companie/:id

Remover empresa:
DELETE /companie/:id

Usuários
Atualizar usuário:
PUT /user/update/:id

Registrar usuário:
POST /user/register

Efetuar login:
POST /user/login

Obter lista de usuários:
GET /

Obter detalhes de um usuário:
GET /:id

Remover usuário:
DELETE /:id




