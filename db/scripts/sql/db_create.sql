create database chat_solati;

CREATE USER solati_user WITH PASSWORD 'solati';

GRANT ALL PRIVILEGES ON DATABASE "chat_solati" to solati_user;

\ c chat_solati;
