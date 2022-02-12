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
import req from "express/lib/request";
import { isRedirect } from "node-fetch";
const router = express.Router()
// const user = require("../database")
import { User } from "../database";
import { DiscordAuth } from "../discord";

const Discord = new DiscordAuth()

// https://stackoverflow.com/questions/60008473/how-to-check-if-user-is-logged-in-with-node-js-and-mongoose



router.get('/login/discord', (req, res) => {
    // Query string is deliverd from discord in the query
    let query_code = req.query.code
    
    // let user = new User();

    // Om klienten redan har en activ session så behöver den inte 
    if (req.session.authenticated) {
        // if (req.session.client_data)
        console.log("User already authenticated")
        return res.redirect('/')
    }

    // Om det inte finns någon query_code så kommer inte klienten från discord
    if (!query_code)
    {   
        console.log("No querycode. Redirect to discord", Discord.OAUTH_SCOPE);
        return res.redirect(Discord.OAUTH_SCOPE)
    }

    console.log("query_code not null; Requesting client data from discord");
    
    (async () => {
        let [loaded_data, exists] = await login_user(query_code);

        // req.session.cookie.maxAge = client_data.valid_until vet inte
        req.session.client_data = {
            id: loaded_data.discord_id,
            avatar: loaded_data.profile_picture,
            username: loaded_data.nickname,
            email: loaded_data.email,
        }
    
        
        // req.session.client_data = client_data;
        // req.session.refresh_token = refresh_token;
        
        if (!exists) return res.redirect('/u/signup');
        
        req.session.authenticated = true;
        // res.send({user_data: client_data, refresh: tokens.refresh_token});
        
        res.redirect('/')
    })();

    

});

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post('/signup', (req, res) => {
    let user_data = req.query.profile_options;

    // om användaren inte skickar med något användarnamn
    if (!user_data.nickname) user_data.nickname = "anon"

    (async () => {
        let user = new User();

        result = await user.create(user_data)

        res.render("index")
    })

})


router.get('/refresh', session_check, async (req, res) => {
    let user = new User()

    // Hämtar nuvarande refresh_token från databasen
    let db_response = await user.get_refresh_token(req.session.client_data.id)
    let refresh_token = db_response.refresh_token

    if (!refresh_token) return res.send({err: "no refresh token"});

    // Frågar efter ett nytt från discord
    let discord_response = await Discord.get_new_tokens(refresh_token)
    
    // Uppdaterar nuvarande refresh token med det nya
    if (discord_response.refresh_token)
        await user.update_refresh_token(res.session.client_data.id, discord_response.refresh_token)

    console.log(discord_response)
    return res.send(discord_response)
});

router.post('/signout', session_check, (req, res) => { 
    console.log("User requested Signout")
    req.session.destroy((err) => {
        res.send({err: err})
    })
    res.redirect('/')
})

router.get('/profile', session_check, async (req, res) => {
    res.send(req.session.client_data)
    let user = new User()
    console.log(await user.get_refresh_token(req.session.client_data.id))
})

router.post('/update_profile', session_check, (req, res) => {
    console.log("User updated profile")
    res.render('profile')
})

router.delete('/remove_user', session_check, (req, res) => {
    console.log("User requested account deletion")
    res.redirect('index')
})

export { router as userRoute };


async function login_user(query_code) {
        // Skapar ett objekt av User klassen
        let user = new User();

        // Hämtar första datan från discord
        let tokens = await Discord.token_exchange(query_code)

        // Retrives clients data from discord
        let client_data = await Discord.get_user_data(tokens)

        // Kolla ifall användaren existerar finns den inte så skapar den en
        
        if (await user.exists(client_data.id) == false) {
            await user.create(client_data, tokens.refresh_token);
        }

        // Laddar in user data
        let loaded_data = await user.load_user(client_data.id)

        
        // kollar ifall refresh_token i databasen är samma som den discord skickar
        await user.update_refresh_token(loaded_data.id, tokens.refresh_token)
        // Sätt loaded_datas refresh_token till det nya

        return [loaded_data, true]
}

function session_check(req, res, next) {
    if (!req.session.authenticated && !req.session.client_data)
        return res.redirect('/');

    next();

}