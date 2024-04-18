## Aplicação Fullstack

Este é um projeto para teste empresa Lazaros feito por Micael Santana

### Como Rodar Usando Docker Compose

Para rodar a aplicação utilizando Docker Compose, siga estas etapas:

1. Certifique-se de ter o Docker e o Docker Compose instalados no seu sistema.
2. Abra um terminal e navegue até a raiz do projeto.
3. Execute o seguinte comando para construir e iniciar os contêineres:

4. Rode o comando abaixo dentro da raiz do projeto fullstack-app

```bash
docker-compose up --build
```

Isso irá construir as imagens necessárias e iniciar os contêineres para o frontend, backend e banco de dados PostgreSQL.

**Após a conclusão do processo de construção, você poderá acessar:**

* **Frontend:** http://localhost:4200/ (certifique-se de que os contêineres estejam em execução)
* **Backend:** http://localhost:8080/ (certifique-se de que os contêineres estejam em execução)

**Banco de dados PostgreSQL:**

* **Porta:** 5432
* **Host:** localhost
* **Usuário:** postgres
* **Senha:** postgres
* **Banco de Dados:** must

**Observação:**

* Certifique-se de fornecer as credenciais corretas ao conectar-se ao banco de dados PostgreSQL.

**Dicas:**

* Para parar os contêineres, execute o comando `docker-compose down`.
* Para construir as imagens novamente, execute o comando `docker-compose up --no-cache` | `docker-compose up --build`.
* Para ver os logs dos contêineres, execute o comando `docker-compose logs`.

**Links úteis:**

* Docker: [https://www.docker.com/](https://www.docker.com/)
* Docker Compose: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
* Angular: [https://angular.io/](https://angular.io/)
* Spring Boot: [https://spring.io/](https://spring.io/)
* PostgreSQL: [https://www.postgresql.org/](https://www.postgresql.org/)
