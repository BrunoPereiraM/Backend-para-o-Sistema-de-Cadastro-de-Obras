# Backend - Sistema de Fiscalização de Obras

Este é o backend desenvolvido em Node.js com MongoDB para dar suporte ao aplicativo de cadastro e monitoramento de obras em andamento.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no servidor.
- **Express**: Framework para a criação da API RESTful.
- **MongoDB**: Banco de dados NoSQL para armazenar os dados.
- **Mongoose**: ORM para modelagem dos dados do MongoDB.
- **Nodemailer**: Biblioteca para o envio de e-mails (simulado com Ethereal).
- **Multer**: Middleware para o upload de arquivos (imagens).
- **Dotenv**: Para gerenciar variáveis de ambiente.

## Estrutura do Projeto

O projeto segue uma estrutura modular inspirada no padrão MVC:
- `/config`: Conexão com o banco de dados.
- `/controllers`: Lógica de negócio de cada rota.
- `/middleware`: Middlewares customizados (ex: upload).
- `/models`: Schemas do Mongoose que definem as entidades.
- `/routes`: Definição dos endpoints da API.
- `/services`: Serviços externos (ex: e-mail).
- `/uploads`: Pasta onde as imagens são salvas localmente.

---

## Instruções de Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- MongoDB (recomenda-se uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register))

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e preencha com as suas credenciais. Use o `.env.example` como modelo.

    **`.env.example`**
    ```
    PORT=5000
    MONGO_URI=sua_string_de_conexao_com_o_mongodb_atlas

    # Crie uma conta de teste no Ethereal: [https://ethereal.email/](https://ethereal.email/)
    EMAIL_HOST=smtp.ethereal.email
    EMAIL_PORT=587
    EMAIL_USER=seu_usuario_ethereal
    EMAIL_PASS=sua_senha_ethereal
    ```

4.  **Execute o servidor em modo de desenvolvimento:**
    O servidor irá reiniciar automaticamente a cada alteração no código.
    ```bash
    npm run dev
    ```

---

## Endpoints da API

A URL base da API é `http://localhost:5000`.

### Obras (`/obras`)

- **`POST /obras`**: Cria uma nova obra.
  - **Tipo de Conteúdo**: `multipart/form-data` (devido ao upload de imagem).
  - **Campos do Formulário**: `nome`, `responsavel`, `dataInicio`, `dataFim`, `lat`, `lon`, `descricao`, `foto` (arquivo de imagem).

- **`GET /obras`**: Lista todas as obras.

- **`GET /obras/:id`**: Retorna os detalhes de uma obra específica.

- **`PUT /obras/:id`**: Atualiza uma obra.
  - **Tipo de Conteúdo**: `multipart/form-data`.

- **`DELETE /obras/:id`**: Deleta uma obra e todas as suas fiscalizações associadas.

- **`GET /obras/:id/fiscalizacoes`**: Lista todas as fiscalizações de uma obra específica.

- **`POST /obras/:id/send-email`**: Envia um relatório da obra por e-mail.
  - **Payload JSON**:
    ```json
    {
      "to": "email_do_destinatario@exemplo.com"
    }
    ```

### Fiscalizações (`/fiscalizacoes`)

- **`POST /fiscalizacoes`**: Cria uma nova fiscalização para uma obra.
  - **Tipo de Conteúdo**: `multipart/form-data`.
  - **Campos do Formulário**: `status`, `observacoes`, `lat`, `lon`, `obra` (ID da obra relacionada), `foto` (arquivo de imagem).

- **`GET /fiscalizacoes`**: Lista todas as fiscalizações de todas as obras.
