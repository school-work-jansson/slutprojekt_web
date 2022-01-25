const express = require("express")
const router = express.Router()


server.post('/send_message', (req, res) => { 
    res.redirect('/contact')
    console.log("User requested to send a mail")
    
})
  

module.exports = router