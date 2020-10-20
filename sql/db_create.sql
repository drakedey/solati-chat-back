CREATE DATABASE chat_solati;

CREATE TABLE conversion_history(
  id SERIAL NOT NULL PRIMARY KEY,
  dolar_value double precision	 NOT NULL,
  colombian_pesos_value double precision	 NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

