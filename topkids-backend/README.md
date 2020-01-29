# Gift card APi


## Instalando o banco de dados 
Essa aplicação depende de um bando de dados postgresql instalado.
Para isso rode o comando:

```
docker run --name giftcard-db -e POSTGRES_PASSORD=docker -e POSTGRES_DB=adonis -e POSTGRES_USER=docker -p 5432:5432 -d postgres
```

Após instalado, verifique se o postgresql está rodando

```
nmap localhost
```

A porta __5432__ deverá está aberta. O retorno do comando acima deverá ser algo como:
```
Starting Nmap 7.80 ( https://nmap.org ) at 2020-01-29 09:02 -03
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000069s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE

5432/tcp open  postgresql
```

## Rodando a API via GitHub


### Clonando o repositório
Para clonar o repositório execute:
```
git clone https://github.com/almerindo/topkids.io-backend.git
```

Entre no diretorio da api:
```
cd topkids.io-backend/topkids-backend
```

### Configurando a API
A API possui um arquivo __.env__ e __.env.testing__ para configurar conforme sua necessidade.
Mova o arquivo __.env.example__ para __.env__ e edite ele com os comandos:

```
mv .env.example .env
vim .env
```

Altere as variáveis conforme seu ambiente e necessidade:
```
HOST=127.0.0.1
PORT=3333
NODE_ENV=production
APP_NAME=GiftCard
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=vVfScDZwKHlVx9aFORUsqoCrDhZjFxYE

DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=docker
DB_PASSWORD=docker
DB_DATABASE=adonis

HASH_DRIVER=bcrypt


SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
MAIL_USERNAME=62c7b128b841c5
MAIL_PASSWORD=f8cf1f0d4c31f0

```

#### Obs. as configurações SMTP estão para a conta mailtrap.io, caso esteja em produção deverá mudar para o seu servidor SMTP. Caso esteja em desenvolvimento, crie uma conta no mailtrap.io para testar se os emails estão chegando.

### Rodando a API

Rode o comando npm install para instalar todas as dependencias da api

```
npm install
```

Caso seja a primeira vez que esteja rodando, você deverá criar o banco de dados com suas tabelas.
Para isso, execute o comando:
```
node ace migration:run --force
```


Depois inicie a API

```
npm start
```

