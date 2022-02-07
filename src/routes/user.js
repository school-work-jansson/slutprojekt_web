/*
    Den här routern kommer användas till autentisering av användare genom att logga in mha Discord


    - Genom att logga in med discord så får man en så kallad discord Auth token när en användare loggar in.
        Denna token kommer man kunna använda för att gå till discord och fråga om information om använaren.
        Discord svarar med denna information och förhoppningsvis ett user ID som är unikt. 
        Detta ID kommer jag att skicka in till databasen och göra användare med det. 
        På så sätt så kommer jag inte behöva spara några lösenord eller liknande utan endast användarens client ID på discord

    - Discord IDt kommer att kopplas till användardatan i databasen tex recenssioner osv

*/


import express from "express";
const router = express.Router()
// const user = require("../database")
import fetch from "node-fetch";


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const OAUTH_SCOPE = process.env.OAUTH_SCOPE;
const DISCORD_ENDPOINT = process.env.DISCORD_ENDPOINT;

// import {responeMessages as error, log} from './log';

router.get('/login', (req, res) => {
    res.send("Login Route")
});

router.get('/login/discord', (req, res) => {
    // Query string is deliverd from discord in the query
    let query_string = req.query.code

    // If user already has active auth; Just proceed
    if (req.session.authenticated) {
        console.log("User already authenticated")
        return res.send(req.session.client)
    }

    if (query_string) // if querycode is something 
    {   
        console.log("query_string not null; Requesting client data from discord");
        (async () => {
            let client_data = await discord_oauth(query_string)
            req.session.authenticated = true;
            req.session.client = client_data
            res.send(client_data);

            // if user does not exist /signup with client_data

            // if user exists, load user data into session
        })();
    }
    else {
        console.log("No querycode. Redirect to discord", OAUTH_SCOPE);
        res.redirect(OAUTH_SCOPE)
    }
});

router.get('/refresh_login/discord', (req, res) => {
    let refresh_token = ""
    //discord_refresh_token_exchange(refresh_token)
});

router.post('/signout', (req, res) => { 
    console.log("User requested Signout")
    res.render('index')
})

router.get('/profile', (req, res) => {
    res.render("profile")
})

router.post('/update_profile', (req, res) => {
    console.log("User updated profile")
    res.render('profile')
})

router.delete('/remove_user', (req, res) => {
    console.log("User requested account deletion")
    res.render('index')
})

export { router as userRoute };

async function discord_oauth(query_string) {
    // Retrives clients auth token from discord
    let discord_auth_data = await discord_token_exchange(query_string)

    // Retrives clients data from discord
    let client_info = await discord_oauth_me(discord_auth_data)

    console.log(discord_auth_data, client_info);

    return client_info
}


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
// Vet ej om detta fungerar men borde fungera i teorin då man endast behöver ändra body
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
        return {discord_refresh_response: null, error: err}
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