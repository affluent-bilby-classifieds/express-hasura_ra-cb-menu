Import the json table for the menu:

```
docker-compose exec postgres /bin/bash
```
Inside the container now run:






```
psql --username=postgres

```

```
postgres=# create database menudb;
CREATE DATABASE
```

```
postgres=# grant all privileges on database menudb to postgres;
GRANT
```
```
\q
```
now back in bash we enter the following:


```
apt-get update
```
```
apt-get install jq
```
```
cd init/json
```

Now we are loading the JSON into a Postgres JSONB column all thanks to the guide from: [(@kiwicopple)](https://dev.to/kiwicopple/loading-json-into-postgres-2l28)

```
cat menuItems.json | jq -cr '.[]' | sed 's/\\[tn]//g' > output.json
```
```
psql -h localhost -p 5432 menudb -U postgres -c "CREATE TABLE menu (data jsonb);"
```

```
cat output.json | psql -h localhost -p 5432 menudb -U postgres -c "COPY menu (data) FROM STDIN;"
```

Now we check the json has been imported to the jsonb table OK.

```
psql --username=postgres

```


```
postgres=# \l
                             List of databases
   Name    | Owner | Encoding |  Collate   |   Ctype    | Access privileges 
-----------+-------+----------+------------+------------+-------------------
 postgres     | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
 menudb    | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres         +
           |       |          |            |            | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres         +
           |       |          |            |            | postgres=CTc/postgres
(4 rows)

```

```
postgres=# \c menudb
You are now connected to database "postgres" as user "postgres".
menudb=# \dt
       List of relations
 Schema | Name | Type  | Owner 
--------+------+-------+-------
 public | menu | table | postgres
(1 row)
```

```
menudb=# SELECT * FROM menu;
                                                                                                                                           data                            
                                                                                                               
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
 {"id": 1, "img": "./images/item-1.jpeg", "desc": "AW Rootbear with a scoop of delicious icecream.", "price": "7.5", "title": "Compton rootbeer", "category": "Drinks"}
 {"id": 2, "img": "./images/item-2.jpeg", "desc": "Chickpea Pattie, Avocardo, Lettuce, Tomato, BBQ sauce, onion, Sweet Chilli. Vegan mayo.", "price": 13.99, "title": "Vega
n Paradise", "category": "Burgers"}
 {"id": 3, "img": "./images/item-3.jpeg", "desc": "The sweetest and most delicious Mexican soda. Loved by Gringos. Great with burgers.", "price": 6.99, "title": "Jarritos 
Mexican Soda", "category": "Drinks"}
 ...etc....
(34 rows)

```
Don't forget to quit: 

```
\q
```


if you need to export the database such as to send to a third party provider:

```
pg_dump -d menudb -U postgres -t menu > file.sql
```
then

```
docker cp postgres_ra-cb-menu_postgres_1:/file.sql .
```

assuminging postgres_ra-cb-menu_postgres_1 is the name of your postgres docker container. 
This copies the sql file to your current directory.
