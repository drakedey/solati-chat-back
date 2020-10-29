FROM postgres
WORKDIR /

RUN ls /var/lib/postgresql/data

COPY scripts/. /docker-entrypoint-initdb.d/

RUN ls /docker-entrypoint-initdb.d/
