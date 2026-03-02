
# 🍕 Pizzaria API - Backend

API REST para gerenciamento de pizzaria, com autenticação, cadastro de usuários, categorias, produtos e fluxo completo de pedidos.

---

## 🚀 Tecnologias
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (autenticação)
- Multer (upload de imagens)
- BCryptJS (criptografia de senhas)

---

## 🏗️ Arquitetura & Convenções

O projeto segue as seguintes camadas e regras:

### Controllers
- Recebem a requisição, extraem dados do `req` e chamam o Service.
- Retornam resposta ao cliente.
- Não possuem lógica de negócio.

### Services
- Implementam toda a regra de negócio.
- Validam dados, interagem com o banco via Prisma.
- Exemplo: `CreateUserService` verifica se o e-mail existe, criptografa senha e cria usuário.

### Middlewares
- `isAuthenticated`: Valida JWT, injeta `user_id` no `req`.
- `isAdmin`: Garante que apenas usuários com `role: ADMIN` acessem rotas restritas.
- `validateSchema`: Valida dados da requisição usando Zod e schemas.

### Schemas
- Todos endpoints possuem validação Zod.
- Exemplo: `createUserSchema` exige nome (min 3), e-mail válido, senha (min 6).

---

## 📋 Endpoints Principais

### 👤 Usuários
- **POST `/users`**: Cadastro de usuário (admin).
  - Validação: nome, e-mail, senha.
  - Exemplo JSON:
    ```json
    {
      "name": "Admin",
      "email": "admin@pizzaria.com",
      "password": "senha_segura"
    }
    ```
- **POST `/session`**: Login, retorna JWT.
  - Exemplo JSON:
    ```json
    {
      "email": "admin@pizzaria.com",
      "password": "senha_segura"
    }
    ```
- **GET `/me`**: Retorna dados do usuário logado (requer JWT).

### 📂 Categorias
- **POST `/category`**: Cria categoria (admin).
  - Exemplo JSON:
    ```json
    {
      "name": "Bebidas"
    }
    ```
- **GET `/category`**: Lista todas as categorias.

### 🛒 Produtos
- **POST `/product`**: Cadastro de produto (admin, multipart/form-data).
  - Campos: nome, preço, descrição, categoria_id, imagem.
- **GET `/products`**: Lista produtos.
- **DELETE `/product`**: Remove produto (admin).

### 📋 Pedidos
- **POST `/order`**: Cria pedido (mesa).
  - Exemplo JSON:
    ```json
    {
      "table": 5,
      "name": "Mesa 5"
    }
    ```
- **POST `/order/add`**: Adiciona item ao pedido.
  - Exemplo JSON:
    ```json
    {
      "order_id": "UUID_DO_PEDIDO",
      "product_id": "UUID_DO_PRODUTO",
      "amount": 2
    }
    ```
- **PUT `/order/send`**: Envia pedido para cozinha.
  - Exemplo JSON:
    ```json
    {
      "order_id": "UUID_DO_PEDIDO",
      "name": "Mesa 5"
    }
    ```
- **PUT `/order/finish`**: Finaliza pedido.
  - Exemplo JSON:
    ```json
    {
      "order_id": "UUID_DO_PEDIDO"
    }
    ```
- **DELETE `/order`**: Remove pedido.
  - Query: `order_id=...`
- **DELETE `/order/remove`**: Remove item do pedido.
  - Query: `item_id=...`

---

## 🛡️ Regras de Validação

- Todos endpoints usam schemas Zod para validação.
- Erros retornam status 400 com detalhes do campo e mensagem.
- Exemplo de erro:
  ```json
  {
    "error": "Erro de validação",
    "details": [
      { "campo": "email", "mensagem": "Precisa ser um email válido" }
    ]
  }
  ```

---

## 🔒 Autenticação & Autorização

- JWT obrigatório para rotas protegidas.
- Usuário admin tem acesso a rotas de cadastro/remoção de categorias e produtos.

---

## 📦 Como Utilizar

1. Clone o projeto via GitHub:
  ```bash
  git clone https://github.com/Emersontlsd/backend-pizzaria.git
  cd backend-pizzaria
  ```
2. Instale dependências:
  ```bash
  npm install
  ```
3. Configure variáveis de ambiente (`.env`):
  - `DATABASE_URL` (Postgres)
  - `JWT_SECRET`
4. Execute as migrations:
  ```bash
  npx prisma migrate dev
  ```
5. Inicie o servidor:
  ```bash
  npm run dev
  ```

---

## 📝 Convenções do Projeto

- Controllers: apenas manipulação de req/res.
- Services: toda lógica de negócio.
- Middlewares: autenticação, autorização, validação.
- Schemas: validação de dados obrigatória.
- Respostas padronizadas (JSON).

---

## 📚 Exemplos de Fluxo

### Cadastro de Usuário
1. Envia JSON para `/users`.
2. Validação via schema.
3. Service verifica duplicidade, criptografa senha, salva no banco.
4. Controller retorna dados do usuário (sem senha).

### Criação de Pedido
1. Envia JSON para `/order`.
2. Service cria pedido com status draft.
3. Adiciona itens via `/order/add`.
4. Envia para cozinha via `/order/send`.
5. Finaliza via `/order/finish`.

---

## 🧩 Estrutura de Pastas

- `src/controllers`: Manipulação de requisições.
- `src/services`: Regras de negócio.
- `src/middlewares`: Autenticação, autorização, validação.
- `src/schemas`: Schemas Zod para validação.
- `src/prisma`: Instância do Prisma Client.

---

## 📄 Licença

Desenvolvido por Emerson S (udemy course).