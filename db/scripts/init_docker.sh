set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE conversion_history(
      id SERIAL NOT NULL PRIMARY KEY,
      dolar_value double precision	 NOT NULL,
      colombian_pesos_value double precision	 NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );

    CREATE TABLE chat_user(
      id SERIAL NOT NULL PRIMARY KEY,
      username varchar(255) NOT NULL,
      user_password TEXT NOT NULL
    );

    ALTER TABLE chat_user ADD CONSTRAINT chat_username_unique UNIQUE (username);

    ALTER TABLE conversion_history ADD COLUMN user_id INT;
    ALTER TABLE conversion_history ADD CONSTRAINT user_fk 
      FOREIGN KEY (user_id) 
      REFERENCES chat_user (id) MATCH SIMPLE 
      ON UPDATE CASCADE ON DELETE NO ACTION;

EOSQL