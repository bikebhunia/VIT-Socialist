## Socialist

### Social Network as Service

Jyotirmoy Bhunia (24BCE0679)
Nishok Kumar SD (24BAI0200)
Gangadi Venkata Naga Koushik (24BDS0116)

### STACK:
- MongoDB
- NEO4J

### Instructions:
1.  Install brew or brew update
2.  brew install mongodb
3.  run mongo: `mongod`
4.  brew install neo4j
5.  `neo4j start`
6.  clone the repo
7.  `npm i`
8.  `npm start`

### API CALLS
- Auth:
    -   GET /api/auth/generate/token - get a token

- Follow:
    -   POST /api/{client_id}/users/{user_id}/follow - follow a user (PAYLOAD {target_id: ID})
    -   DEL /api/{client_id}/users/{user_id}/unfollow - unfollow a user (PAYLOAD {target_id: ID})
    -   GET /api/{client_id}/users/{user_id}/relation/{target_id} - get relation between users

- Like:
    -   POST /api/{client_id}/users/{user_id}/like/{item_id} - user like
    -   GET /api/{client_id}/users/{user_id}/like/{item_id} - check if user like the page
    -   GET /api/{client_id}/users/{user_id}/like/all

- Friend
    -   GET /api/{client_id}/users/{user_id}/friends/all - return {total_friends: INT, friends: [{},{}]}
    -   GET /api/{client_id}/users/{user_id}/friends/{target_id} - return BOOL
    -   POST /api/{client_id}/users/{user_id}/friends/{target_id} - add friend
    -   DEL /api/{client_id}/users/{user_id}/friends/{target_id} - unfriend

- View
    -   GET /api/{client_id}/users/{user_id}/views/all - return items that the user view
    -   GET /api/{client_id}/users/{user_id}/views/{target_id} - BOOL
    -   POST /api/{client_id}/users/{user_id}/views/{target_id}

- Listen
    -   GET /api/{client_id}/users/{user_id}/listen/all - return items that the user listen to (track, playlist, albums, artist)
    -   GET /api/{client_id}/users/{user_id}/listen/{target_id} - BOOL
    -   POST /api/{client_id}/users/{user_id}/listen/{target_id}

- Watch
    -   GET /api/{client_id}/users/{user_id}/watch/all - return items that the user watch to (clip, movie, photo)
    -   GET /api/{client_id}/users/{user_id}/watch/{target_id} - BOOL
    -   POST /api/{client_id}/users/{user_id}/watch/{target_id} - user (id) watch item (id)

### How's it work
-   Saving data in MongoDB and storing relationship data in NEO4J


** Doron Segal.


## Running on Apple Silicon (tested on macOS)

- Node 12 under Rosetta: run `arch -x86_64 zsh`, then `nvm use 12`
- Neo4j 3.5: `docker run -d --name neo4j35 --platform linux/amd64 -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=none neo4j:3.5`
- MongoDB 4.4: `docker run -d --name mongo44 --platform linux/amd64 -p 27018:27017 mongo:4.4`
- `npm install`, then `node index.js`
- `settings/dev.json` points MongoDB at port 27018

## Example requests

Create a user (note the returned user_id):
curl -X POST http://localhost:9987/api/clientnumber01/users/create -H "Content-Type: application/json" -d '{"username": "asharao", "password": "secret1", "email": "asha@example.com", "phone": 9876543210, "first_name": "Asha", "last_name": "Rao"}'

Follow a user:
curl -X POST http://localhost:9987/api/clientnumber01/users/FOLLOWER_ID/follow -H "Content-Type: application/json" -d '{"target_id": ["TARGET_ID"]}'

Based on the original project by Doron Segal and Evan Netzer.


git add README.md
git commit -m "Add setup notes"
git push
