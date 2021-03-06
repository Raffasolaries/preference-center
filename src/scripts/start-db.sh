#!/bin/bash
set -o allexport
[[ -f .env ]] && source .env
set +o allexport

set -e
# SERVER="preference_center_server_db";
# PW="didomi2021";
# DB="preference_center_db";
SERVER=$POSTGRES_SERVER;
PW=$POSTGRES_PASSWORD;
DB=$POSTGRES_DATABASE;

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 3;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres