import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Teste Backend Node',
      version: '1.0.0',
      description: 'Descrição da sua API',
    },
    servers: [
      {
        url: 'http://localhost:3333', // Atualize com a URL base da sua API
      },
    ],
    paths: {
      "/user/login": {
        "post": {
          "summary": "Efetua login de um usuário",
          "tags": ["Usuário"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "Email do usuário",
                      "example": "dev@dev.com.br"
                    },
                    "password": {
                      "type": "string",
                      "format": "password",
                      "description": "Senha do usuário",
                      "example": "123mudar"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login bem-sucedido, retorna o token de autenticação"
            },
            "401": {
              "description": "Credenciais inválidas"
            },
            "500": {
              "description": "Erro no servidor"
            }
          }
        }
      },
      "/user": {
        "get": {
          "summary": "Obtém informações de todos os usuários",
          "security":[
            {
              "bearerAuth": [],
            }
          ],
          "tags": ["Usuário"],
          "responses": {
            "200": {
              "description": "Lista de usuários"
            },
            "500": {
              "description": "Erro no servidor"
            }
          }
        }
      },
      "/user/{id}": {
        "get": {
          "summary": "Obtém informações de um unico usúario",
          "security":[
            {
              "bearerAuth": [],
            }
          ],
          "tags": ["Usuário"],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "description": "ID do usuário",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Lista de usuário"
            },
            "500": {
              "description": "Erro no servidor"
            }
          }
        }
      },
      "/user/register": {
        "post": {
          "summary": "Cria um novo usuário",
          "tags": ["Usuário"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example":"dev"
                    },
                    "cpf": {
                      "type": "string",
                      "example": "35091328823"
                    },
                    "phone": {
                      "type": "string",
                      "example": "11234353"
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "example": "dev@dev.com.br"
                    },
                    "password": {
                      "type": "string",
                      "example": "123mudar"
                    },
                    "companyId": {
                      "type": "integer",
                      "example": 1
                    }
                  },
                  "required": ["name", "cpf", "phone", "email", "password"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Usuário registrado com sucesso, retorna o token de autenticação"
            },
            "400": {
              "description": "Erro nos dados enviados"
            },
            "500": {
              "description": "Erro no servidor"
            }
          }
        }
      },
    },
    components: {
      "securitySchemes":{
        "bearerAuth": {
          "description":"Autenticação utilizando JWT",
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
        
      }
      

    }

  },
  apis: ['./src/server/*.ts'], // Atualize para o caminho dos seus arquivos de rotas
};

const specs = swaggerJsDoc(options);

export default (app: express.Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
