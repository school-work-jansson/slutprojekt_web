# slutprojekt_web



# Länkar att lösa
- [handling refresh tokens](https://stackoverflow.com/questions/59511628/is-it-secure-to-store-a-refresh-token-in-the-database-to-issue-new-access-toke)
- [storing access tokens](https://stackoverflow.com/questions/44324080/how-to-store-access-token-oauth-2-auth-code-flow)

# Env file template
```
SESSION_SECRET="monkey car"

DB_HOST=
DB_PORT=
DB_USER=
DB_NAME=

CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=
OAUTH_SCOPE=
DISCORD_ENDPOINT=

MAIL_NAME=
MAIL_PASSWORD=

```

# Docker database 
`docker run --name {image_name} --restart unless-stopped -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 -p 33060:33060 -v ~/test-mysql:/var/lib/mysql mysql`
`docker exec -it {image_name} bash`
`mysql -u {USER} -p`
