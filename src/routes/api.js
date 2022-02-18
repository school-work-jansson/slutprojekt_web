import express from "express";
const router = express.Router()

// https://www.w3schools.com/nodejs/nodejs_email.asp

router.get('/hello_world', (req, res) => { 
    res.send({status: 200});
})
  

export {router as apiRoute}