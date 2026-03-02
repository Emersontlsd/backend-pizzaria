# Contexto do Projeto - Pizzaria Backend

## Arquitetura

- **Padrão Camadas:**
  - **Rotas:** Recebem requisições HTTP e direcionam para o Controller correspondente.
  - **Controllers:** Recebem a requisição, validam dados via middlewares, repassam para o Service e retornam resposta ao usuário.
  - **Services:** Lógica de negócio, comunicação com o banco (Prisma), validações extras e retorno ao Controller.
  - **Middlewares:** Autenticação (JWT), autorização (admin), validação de schemas (Zod).

## Organização de Pastas

- `src/`
  - `controllers/` - Controllers das entidades (user, category, product, etc)
    - `user/` - Usuário (Create, Auth, Detail)
    - `category/` - Categoria (Create, List)
    - `product/` - Produto (Create)
  - `services/` - Lógica de negócio das entidades
    - `user/` - Usuário
    - `category/` - Categoria
    - `product/` - Produto
  - `middlewares/` - Autenticação, autorização, validação
    - `isAuthenticated.ts` - Verifica JWT
    - `isAdmin.ts` - Verifica papel ADMIN
    - `validateSchema.ts` - Validação Zod
  - `schemas/` - Schemas de validação (Zod)
    - `userSchema.ts`, `categorySchema.ts`, `productSchema.ts`
  - `prisma/` - Instância do Prisma Client
  - `generated/prisma/` - Código gerado pelo Prisma
  - `routes.ts` - Definição das rotas
  - `server.ts` - Inicialização do servidor Express
- `prisma/`
  - `schema.prisma` - Modelagem do banco de dados
  - `migrations/` - Migrations do banco

## Endpoints Detalhados

### Usuário
- **POST /users**
  - Criação de usuário
  - Validação: `createUserSchema`
  - Controller: `CreateUserController`
  - Service: `CreateUserService`
- **POST /session**
  - Autenticação de usuário
  - Validação: `authUserSchema`
  - Controller: `AuthUserController`
  - Service: `AuthUserService`
- **GET /me**
  - Detalhes do usuário autenticado
  - Middleware: `isAuthenticated`
  - Controller: `DetailUserController`
  - Service: `DetailUserService`

### Categoria
- **POST /category**
  - Criação de categoria
  - Middlewares: `isAuthenticated`, `isAdmin`, `validateSchema(createCategorySchema)`
  - Controller: `CreateCategoryController`
  - Service: `CreateCategoryService`
- **GET /category**
  - Listar todas as categorias
  - Middleware: `isAuthenticated`
  - Controller: `ListCategoryController`
  - Service: `ListCategoryService`

### Produto
- **POST /product**
  - Criação de produto
  - Middlewares: `isAuthenticated`, `isAdmin`, `upload.single('file')`, `validateSchema(createProductSchema)`
  - Controller: `CreateProductController`
  - Service: `CreateProductService`
  - Upload de imagem via Multer + Cloudinary

## Modelagem do Banco de Dados (Prisma)

- **User**
  - id: String (UUID, PK)
  - name: String
  - email: String (único)
  - password: String (hash)
  - role: Enum (STAFF/ADMIN)
  - createdAt: DateTime
  - updatedAt: DateTime
- **Category**
  - id: String (UUID, PK)
  - name: String
  - createdAt: DateTime
  - updatedAt: DateTime
  - products: Relação com Product
- **Product**
  - id: String (UUID, PK)
  - name: String
  - price: Int (centavos)
  - description: String
  - banner: String (URL da imagem)
  - disabled: Boolean
  - category_id: String (FK)
  - createdAt: DateTime
  - updatedAt: DateTime
  - items: Relação com Item
- **Order**
  - id: String (UUID, PK)
  - table: Int
  - status: Boolean (aberto/fechado)
  - draft: Boolean (rascunho/cozinha)
  - name: String?
  - items: Relação com Item
  - createdAt: DateTime
  - updatedAt: DateTime
- **Item**
  - id: String (UUID, PK)
  - amount: Int
  - createdAt: DateTime
  - updatedAt: DateTime
  - order_id: String (FK)
  - product_id: String (FK)

## Validação de Schemas

- Utiliza **Zod** para validação de dados de entrada.
- Schemas principais:
  - `createUserSchema`: name (min 3), email (email válido), password (min 6)
  - `authUserSchema`: email (email válido), password (min 1)
  - `createCategorySchema`: name (min 2)
  - `createProductSchema`: name (obrigatório), price (apenas números, obrigatório), description (obrigatório), category_id (obrigatório)
- Middleware `validateSchema` aplica o schema antes de chegar ao controller.

## Middlewares

- `validateSchema`: Valida corpo/query/params da requisição usando Zod.
- `isAuthenticated`: Verifica JWT e adiciona `user_id` à requisição.
- `isAdmin`: Verifica se o usuário autenticado possui papel ADMIN.

## Versões das Bibliotecas Principais

- express: ^5.2.1
- prisma: ^7.4.1
- @prisma/client: ^7.4.1
- zod: ^4.3.6
- bcryptjs: ^3.0.3
- jsonwebtoken: ^9.0.3
- typescript: ^5.9.3
- cors: ^2.8.6
- dotenv: ^17.3.1
- pg: ^8.18.0

## Observações

- Projeto utiliza TypeScript com configurações estritas.
- Prisma Client gerado em `src/generated/prisma`.
- Banco de dados: PostgreSQL.
- Migrations gerenciadas via Prisma Migrate.
- Upload de imagens de produto via Multer + Cloudinary.

---

*Gerado automaticamente em 27/02/2026.*
