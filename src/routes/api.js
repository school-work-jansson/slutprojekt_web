import express from "express";
const router = express.Router()

import { Product, User } from "../database";
import { session_check } from "../middleware";

// https://www.w3schools.com/nodejs/nodejs_email.asp

router.get('/hello_world', (req, res) => { 
    res.send({status: 200});
})
  
router.post('/update_profile', session_check, (req, res) => {
    let user_data = req.body;

    // om användaren inte skickar med något användarnamn
    req.session.client_data.username = user_data.username;
    req.session.client_data.email = user_data.email;

    console.log(user_data);
    
    (async () => {
        let user = new User(req.session.client_data.id);
        // Eftersom att jag måste lagra refresh_token så "initlizar" jag användaren
        // sedan uppdaterar jag databasen med ny data ifall användaren vill byta namn eller epost
        let result = await user.update(req.session.client_data);
        
        console.log(result);

    })();

    res.redirect("/u/profile");
    
})

router.delete('/remove_user', session_check, (req, res) => {
    console.log("User requested account deletion")
    res.redirect('index')
})

router.post('/search', async (req, res) => {
    // res.send("Recieved");

    let product = new Product()
    // console.log(req.body)
    let result = await product.search(req.body.seach_query)
    res.send(result)
    
})

router.get("/getDarkmodeSetting", (req, res) => {
    if (req.session.user_darkmode) {
        res.status(202).send(req.session.user_darkmode)
    }
    else {
        req.session.user_darkmode = false;

        res.status(202).send(req.session.user_darkmode)
    }

    
})


// TODO: möjligen ändra så att den sparas i någon column i databasen istället för i session
// så att man inte blir flashad så fort mitt i natten ifall servern startar om eller man inte varit inne på ett tag
router.post("/toggleDarkmodeSetting", (req, res) => {
    // console.log("\nSet darkmode flag;", 
    //             "\nGot:", req.session.user_darkmode, 
    //             "\ntype:", typeof(req.session.user_darkmode), 
    //             "\nNeeds conversion?:", (typeof(req.session.user_darkmode) == "string") ? " yes" : "no", 
    //             )
    let dark_mode_setting = Boolean(req.body.dark_mode_setting)
    
    req.session.user_darkmode = !req.session.user_darkmode

    console.log("updated user settings to ->", req.session.user_darkmode, "(", !dark_mode_setting, ")")
    res.sendStatus(202);
})


router.post("/post_review", async (req, res) => {
    
});

export {router as apiRoute}