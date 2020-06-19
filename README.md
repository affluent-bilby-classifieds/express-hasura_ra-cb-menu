Please note: Although I am a seasoned tech guy I am quite a novice as a developer. If you experience issues with this project please try the original at: https://github.com/francoisruty/fruty_react-admin

I have tried to automate the building of the docker containers by adding .sh scripts and hooks to the docker-compose.yml file. 

Next I will try to add a json field to postgres and allow the contents to be edited. This will be a menu for a real-life burger restaurant.

Blog post: https://fruty.io/2020/01/15/building-business-apps-with-react-admin/

### Procedure

- git clone repo and cd into it

- docker-compose up -d



Install dependencies for front and back:

docker-compose run front /bin/sh

docker-compose run back /bin/sh

docker-compose up -d

Create a new user:
curl -X POST \
  http://localhost:3000/api/create_user \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "test@test.fr",
  "password": "Password1"
}'

You should get:
{"result":"user created."}

All containers should now be up, and you can go to http://localhost:3000 in your browser.

### Verifications

- you should be able to log in with the user you created.

- you should be able to create, edit, and delete items.


### Notes


- we use a nginx load-balancer in front of the dev server, so that we can easily route
API calls to the back docker container, without messing with front dev server parameters.

- do NOT use this setup in production! This is a dev environment! For production you would have
to make Dockerfiles for front and back (front Dockerfile would use among other things "npm run build" command), build those docker containers and use them in docker-compose.yml, instead of mapping source code inside containers with docker filesystem mappings + installing manually dependencies.
