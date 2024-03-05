# Back-end
Deploy realizado no <a href="https://vercel.com/" target="_blank">Vercel</a> e disponível <a href="https://phone-management-api.vercel.app/" target="_blank">aqui</a>.
Banco de dados também hospedado na Vercel.

## Tecnologias utilizadas
- <a href="https://expressjs.com/" target="_blank">Express</a>
- <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>
- <a href="https://sequelize.org/" target="_blank">Sequelize</a>
- <a href="https://www.docker.com/" target="_blank">Docker</a>
- <a href="https://joi.dev/">Joi</a>
- <a href="https://jwt.io/" target="_blank">JSON Web Token (JWT)</a>
- <a href="https://mochajs.org/" target="_blank">Mocha</a>
- <a href="https://www.chaijs.com/" target="_blank">Chai</a>
- <a href="https://sinonjs.org/" target="_blank">Sinon</a>
- <a href="https://www.npmjs.com/package/bcryptjs" target="_blank">bcrypt.js</a>
- <a href="https://nodemon.io/" target="_blank">Nodemon</a>
- <a href="https://www.npmjs.com/package/cors" target="_blank">Cors</a>
- <a href="https://www.npmjs.com/package/dotenv" target="_blank">dotenv</a>
- <a href="https://www.npmjs.com/package/express-rate-limit" target="_blank">express-rate-limit</a>
- <a href="https://www.npmjs.com/package/helmet" target="_blank">Helmet</a>

## Testes
Verifique se está dentro do repositório ```api``` e rode o comando ```npm test``` para testar as camadas service e controller.

## Funcionalidades
1) Endpoint ```/user``` para os usuários.
   - ```POST /user``` para criar um usuário. O corpo da requisição deve conter userName, email e password.
  
2) Endpoint ```/login``` para login.
   - ```POST /login``` retorna um token válido. O corpo da requisição deve conter email e password.

3) Endpoint ```/phone``` para os celulares. É necessário um token válido para as requisições.
   - ```POST /phone``` para criar celulares. O corpo da requisição aceita 3 formatos:
**<linha vazia>**
 ```
{
 name: "Xiaomi Redmi 9",
 brand: "Xiaomi",
 model: "Redmi 9",
 price: 10000,
 color: "red"
}
 ```

**<linha vazia>**

   ```
{
   name: "Xiaomi Redmi 9",
   details: {
     brand: "Xiaomi",
     model: "Redmi 9",
     color: "red"
   },
   price: 10000,
}
   ```

**<linha vazia>**

```
[  
   {
        name: "Xiaomi Redmi 9",
        brand: "Xiaomi",
        model: "Redmi 9",
        data: [
           {
        	  price:  10000,
        	  color: "red"
           },
          {
        	  price:  10000,
        	  color: "blue"
           }
        ]
   },
   {
        name: "Iphone 14 Pro",
        brand: "Iphone",
        model: "14 Pro",
        data: [
           {
        	  price:  30000,
        	  color: "silver"
           },
          {
        	  price:  30100,
        	  color: "gold"
           }
        ]
   }
]
```

- ```PUT /phone/:id``` atualiz um celular. O corpo da requisição deve conter name, brand, model, price e color.
- ```GET /phone``` retorna todos os celulares.
- ```DELETE /phone/:id``` deleta um celular.


