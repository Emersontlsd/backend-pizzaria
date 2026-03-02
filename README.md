# 🍕 Pizzaria API - Back-end Unificado

Esta é uma API REST completa para gerenciamento de pizzarias, permitindo o controle de usuários, categorias, produtos e o fluxo de pedidos (desde o rascunho até a entrega).

---

## 🚀 Tecnologias Utilizadas
- **Node.js** com **TypeScript**
- **Express**: Framework web.
- **Prisma ORM**: Manipulação do banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **JWT (JSON Web Token)**: Autenticação segura.
- **Multer**: Upload de imagens.
- **BCryptJS**: Criptografia de senhas.

---

## 🏗️ Arquitetura e Camadas do Sistema

O projeto segue uma estrutura de separação de responsabilidades para facilitar a manutenção:

### 1. Controllers
Responsáveis por receber a requisição HTTP (`req`), extrair os dados e enviar para o Service. Eles retornam a resposta final (`res`).
- **Exemplo**: `CreateProductController.ts` extrai dados do corpo da requisição e o arquivo de imagem via Multer.

### 2. Services (Regras de Negócio)
Onde reside a lógica principal. O Service valida se os dados são permitidos e interage com o banco de dados via Prisma.
- **CreateUserService**: Valida se o e-mail já existe e criptografa a senha.
- **AddItemService**: Verifica se o `order_id` é válido antes de inserir o item.

### 3. Middlewares
- **isAuthenticated**: Protege rotas privadas. Verifica se o Token JWT é válido e injeta o `user_id` no objeto `req` para que os controllers saibam quem está operando o sistema.

---

## 🛠️ Endpoints e Documentação JSON

### 👤 Usuários e Autenticação
- **POST `/users`**: Cadastro de novos administradores.
- **POST `/session`**: Login e geração de Token.
- **GET `/me`**: Detalhes do perfil logado (Requer Token).

**Exemplo JSON (Cadastro):**
```json
{
  "name": "Admin",
  "email": "admin@pizzaria.com",
  "password": "senha_segura"
}

---

## 📂 Categorias e Produtos
º POST /category: Cria categoria (Ex: {"name": "Bebidas"}).

º GET /category: Lista todas as categorias.

º POST /product: Cadastro via Multipart Form (envio de imagem).

## 📋 Fluxo de Pedidos (Orders)
POST /order: Abre uma mesa (Status: Rascunho/Draft).

º POST /order/add: Adiciona itens ao pedido.

º PUT /order/send: Finaliza o rascunho e envia para a cozinha.

º PUT /order/finish: Marca o pedido como concluído.

º Exemplo JSON (Adicionar Item):

```json
{
  "order_id": "UUID_DO_PEDIDO",
  "product_id": "UUID_DO_PRODUTO",
  "amount": 2
}

--- 

🔄 Fluxo de Alteração e Deleção

º   Alteração (PUT):

º     /order/send: Muda o campo draft de true para false.

º     /order/finish: Muda o campo status de false para true.

º   Deleção (DELETE):

º     /order?order_id=...: Deleta o pedido por completo.

º     /order/remove?item_id=...: Remove apenas um item específico da lista.