import express from "express";
const router = express.Router()


router.post('/send_message', (req, res) => { 
    res.redirect('/contact')
    console.log("User requested to send a mail")
    
})
  

module.exports = router