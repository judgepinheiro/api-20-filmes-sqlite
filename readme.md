# API de Filmes SQLite 🎬

## 📌 Descrição
API REST desenvolvida em Node.js com banco de dados SQLite para gerenciamento de filmes.

---

## 🚀 Como rodar o projeto

1. Instalar dependências:
```bash
npm install
Rodar o servidor:
node index.js
Acessar:
http://localhost:3000/filmes
📌 Rotas
GET /filmes

Lista todos os filmes

GET /filmes/:id

Busca um filme por ID

POST /filmes

Cria um novo filme

{
  "titulo": "Novo Filme",
  "diretor": "Teste",
  "ano": 2025
}
PUT /filmes/:id

Atualiza um filme

DELETE /filmes/:id

Remove um filme

🔍 Filtros
/filmes?ano=2010
📄 Paginação
/filmes?page=1&limit=5
📊 Ordenação
/filmes?ordem=ASC
/filmes?ordem=DESC
📊 Status Codes
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
📮 Testes

Testes realizados com Postman.

Collection incluída no projeto.

👨‍💻 Autor

Mateus Pinheiro
