import express from "express";
const router = express.Router()

import { Product, User } from "../database";
import { session_check } from "../middleware";

import fs from "fs";
import { count } from "console";


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
    res.render('about', {
            user: ((req.session.client_data) ? req.session.client_data : null), 
            file_data: null
        },);  
    // res.send("Response");
});

router.get('/about/:markdownfile', (req, res, next) => { 

    // dokumentation.md projektplannering.md
    fs.readFile(process.cwd() + "/documentation_obsidian/" + req.params.markdownfile, 'utf-8', (err, data) => {
        if (err) return next(err);
        
        // data = data.replace(/(\n)+/g, '\n\n')
        // console.log(JSON.stringify(data))
        // console.log("parsed", req.params.markdownfile)
        return res.render('about', {
                    user: ((req.session.client_data) ? req.session.client_data : null), 
                    file_data: data
                });
    })
    
})


export {router as rootRoute}