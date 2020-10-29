# solati-chat-back
chat de la prueba de solati


## Requirements
- Postgresql 9.5
- NodeJS 12.18.2

## Instructions
### DB Setup
1. Open a psql terminal an execute the query db/db_create.sql
### Enviroment setup
1. Do npm install
2. Setup .env config file on path config/config.env
```
API_KEY

DB_USER
DB_HOST
DB_NAME
DB_PASSWORD
DB_PORT

PASSWORD_SALT

TOKEN_HASH
TOKEN_EXPIRATION_SECONDS
```
Note: this project use https://www.currencyconverterapi.com/ as provider for the exchange rate, get an api key for the server and place it in the API_KEY value of the .env file

3. Run node server
