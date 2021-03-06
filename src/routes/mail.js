import express from "express";
const router = express.Router()
import nodemailer from "nodemailer";

// https://www.w3schools.com/nodejs/nodejs_email.asp


// put into env vars
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PASSWORD
    }
});

router.get('/', (req, res) => { 
    res.send("Vid kontakt maila: <a href='mailto:linus.jansson2000@gmail.com'>här</a>");
});

router.post('/send_message', (req, res) => { 

    let mailOptions = {
        from: req.body.recepient,
        to: process.env.mailAdress,
        subject: req.body.subject,
        text: req.body.content
    };

    // res.redirect('/contact')

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.sendStatus(500).render(`contact`, {response: "500: Server error", message: "Something went wrong"})
        }
        else {
            res.sendStatus(200).render(`contact`, {response: "200: Success", message: "Mail sent!"})
            console.log('Email sent: ' + info.response);
        }
    }); 
    console.log("User requested to send a mail")
    
})
  

export {router as mailRoute}