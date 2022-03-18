import express from "express";
const router = express.Router()

import { Product, User } from "../database";
import { session_check } from "../middleware";


router.get('/', (req, res) => { 
    // https://discord.com/developers/docs/reference#image-formatting
    if (req.session.client_data) console.log(req.session.client_data);

    console.log(req.session.cookie.expires, req.session.cookie.maxAge)

    res.render('index', {
            user: ((req.session.client_data) ? req.session.client_data : null),
        });
})
  

router.get('/test', (req, res) => { 
    res.render('test')
})

router.get('/about', (req, res) => { 
//   res.render('about');
    res.send("Response");
});

router.get('/about/:markdownfile', (req, res) => { 
    res.render("marked", {data: 2})
    
})


export {router as rootRoute}