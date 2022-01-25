/*
    This router will be used to authenticate a User by using the Database class 
*/


import express from "express";
const router = express.Router()
// const user = require("../database")
import fetch from "node-fetch";

const CLIENT_ID = '935563184138506330';
const CLIENT_SECRET = "HiWaoSlp_hOmrLlCl96KpwuybnlrKv3k";
const REDIRECT_URI = "http://localhost:8080/login/discord";
const OAUTH_SCOPE = "https://discord.com/api/oauth2/authorize?client_id=935563184138506330&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Fdiscord&response_type=code&scope=identify%20email";
const DISCORD_ENDPOINT = "https://discord.com/api/v9"

// import {responeMessages as error, log} from './log';

router.get('/login/discord', (req, res) => {
    // res.send('<form method="POST" action="/login"><button type="submit">submit</button></form>')
    // Query code is deliverd from discord
    let query_string = req.query.code

    if (query_string) // if querycode is something 
    {   
        console.log("Querycode not null");
        (async () => {
            let client_data = await discord_oauth(query_string)
            res.send(client_data);
        })();
    }
    else {
        console.log("No querycode. Redirect to discord");
        res.redirect(OAUTH_SCOPE)
    }
})

router.get('/login/discord/refresh', (req, res) => {

});

router.post('/signout', (req, res) => { 
    console.log("User requested Signout")
    res.redirect('/')
})


export { router as authRoute };

async function discord_oauth(query_string) {
    let discord_auth_data = await discord_token_exchange(query_string)

    let client_info = await discord_oauth_me(discord_auth_data)

    console.log(discord_auth_data, client_info);

    return client_info
}


// TODO: LÄGG TILL TOKEN REFRESH EXCHANGE
async function discord_oauth_me(discord_token_data)
{
    try {
        // Get user data from the authenticated user
        let discord_auth_info = await fetch(`${DISCORD_ENDPOINT}/users/@me`, {
            headers: {
                authorization: `${discord_token_data.token_type} ${discord_token_data.access_token}`,
            }
        });
        return await discord_auth_info.json()

    } catch (err) {
        
        return {client_data: null}
    }

}


// Refresh_token kommer orginellt från discord_token_exchange
// Används för att användaren ska fortsätta vara inloggad utan att behöva logga in igen.
// https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/
// TODO: Antingen spara refresh token i cookie/session eller spara i databas (Troligen dålig idé, idée nmr 2)
async function discord_refresh_token_exchange(refresh_token) {
    const body_data = new URLSearchParams();
    body_data.append('client_id', CLIENT_ID);
    body_data.append('client_secret', CLIENT_SECRET);
    body_data.append('grant_type', 'refresh_token');
    body_data.append('refresh_token', refresh_token);

    const authData = {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
      body: body_data
    }

    try {
        let discord_refresh_response = await fetch(`${DISCORD_ENDPOINT}/oauth2/token`, authData);
        return await discord_refresh_response.json()
    } catch (err) {
        return {get_discord_oauth_token: null, error: err}
    }

}

async function discord_token_exchange(query_string) {

    // Data som skickas till discord's post body
    const body_data = new URLSearchParams();
    body_data.append('client_id', CLIENT_ID);
    body_data.append('client_secret', CLIENT_SECRET);
    body_data.append('grant_type', 'authorization_code');
    body_data.append('code', query_string);
    body_data.append('redirect_uri', REDIRECT_URI);
    body_data.append('scope', 'identify email');

    const authData = {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
      body: body_data
    }

    try {
        let discord_token_response = await fetch(`${DISCORD_ENDPOINT}/oauth2/token`, authData);
        return await discord_token_response.json()
    } catch (err) {
        return {get_discord_oauth_token: null, error: err}
    }
}