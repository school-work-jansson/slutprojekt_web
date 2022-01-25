/*
    This router will be used to authenticate a User by using the Database class 
*/

const express = require("express")
const router = express.Router()


server.post('/login', (req, res) => { 
    console.log("User requested login")
    res.redirect('/')
})

server.post('/signout', (req, res) => { 
    console.log("User requested Signout")
    res.redirect('/')
})

module.exports = router