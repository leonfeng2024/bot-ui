# install postgreSQL
docker pull postgres:latest 

docker run -d \
  --name postgresql \
  -e POSTGRES_DB=local_rag \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=Automation2025 \
  -p 5432:5432 \
  postgres:latest 


# download pgadmin 4 for postgreSQL
https://www.postgresql.org/ftp/pgadmin/pgadmin4/v9.1/macos/


# install neo4j
docker pull neo4j:latest 

docker run -d \
  --name neo4j \
  -e NEO4J_AUTH=neo4j/neo4j2025 \
  -p 7474:7474 \
  -p 7687:7687 \
  neo4j:latest 

# neo4j home page 
http://localhost:7474/browser/
neo4j
neo4j2025
