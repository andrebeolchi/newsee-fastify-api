# Manual de Uso da API

### Introdução

A API Newsee Blog Fiap permite que professores possam compartilhar conteúdo didático e informativo com seus alunos.
Este manual oferece uma visão geral de como usar os endpoints disponíveis, incluindo detalhes
de autenticação, exemplos de requisições e respostas, e tratamento de erros.

## Documentação

Uma documentação foi feita utilizando swagger e está disponível na rota [`/`](https://newsee-fastify-api.onrender.com/) da aplicação

## Configuração Inicial

Ambiente de testes:

- https://newsee-fastify-api.onrender.com/

## Autenticação

A API utiliza autenticação baseada em tokens. Você deve incluir o token no cabeçalho de cada
requisição.

Exemplo de Cabeçalho de Autenticação:

Authorization: Bearer {seu_token_aqui}

Como obter um token:
Acesse o endpoint /sign-in com suas credenciais.
Receba o token no campo accessToken da resposta.

## Endpoints

### Posts

- GET /posts: Retorna todos os posts.
- POST /posts: Cria um post.
- GET /posts/search: Retorna posts baseados por pesquisa em título ou conteúdo.
- GET /posts/{id}: Retorna post especificado pelo id.
- PUT /posts/{id}: Atualiza post especificado pelo id.
- DELETE / posts/{id}: Exlúi post especificado pelo id.

### Usuários

- POST /users: Cria um novo usuário.
- POST /sign-in: Cria um novo produto.
- GET /users/{id}: Retorna usuário especificado pelo id.
- PUT /users/{id}: Atualiza usuário especificado pelo id.
- DELETE /users/{id}: Exlúi usuário especificado pelo id.

## Tratamento de Erros

Erros comuns incluem:
| Cód.| Descrição |
|-----|------------------------------------------------------|
| 400 | Bad Request: Dados inválidos enviados na requisição. |
| 401 | Unauthorized: Token ausente ou inválido. |
| 404 | Not Found: Recurso não encontrado. |
| 409 | Already Exists: Recurso já existe |
| 500 | Internal Server Error: Erro inesperado no servidor. |
