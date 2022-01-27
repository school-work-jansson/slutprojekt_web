import express from "express";
import bodyParser from "body-parser";
import path from "path";
import seession from 'express-session';

import { v4 as uuid } from 'uuid';

import { __dirname } from "./utils";

// måste användas för att requirea
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url); 

const server = express()


/* 
  The secret should be a random string of characters. 
  Ideally you would also change it periodically in case it has been discovered. 
  However, this requires support for secret rotation so you don't immediately invalidate existing sessions. 
  That is, two session secrets should be considered valid simultaneously.
  To my knowledge, Express doesn't have support for rotating secrets at this time. 
  https://stackoverflow.com/questions/43887865/what-is-a-secure-session-secret
  https://www.npmjs.com/package/session-file-store kke den här bara för exempel istället för att spara i minnet
*/
let time = 36000
server.use(session({
  secret: process.env.SESSION_SECRET,
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  // store: 
  cookie: {
    maxAge: time
  }
}))

import helmet from 'helmet';
server.use(helmet())

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())


server.use(express.static(path.join(__dirname, 'static'))); // Static files as stylesheets and scripts
server.set('views', path.join(__dirname, 'pages')); // SSR webpages (index, contact, profile, login)
server.set('view engine', 'ejs');

let info = {
  desc: "Det här projektet kommer att vara lite som trustpilot fast istället för att vara inriktad på företag i sig så kommer den att targeta recenssion av matprodukter från olika företag."
}

server.get('/', (req, res) => { 
  res.render('index', {description: info.desc})
})

server.get('/about', (req, res) => { 
  res.send(`<p>${info.desc}</p>`);
})

import { mailRoute } from './routes/mail'
server.use('/contact', mailRoute)

import { userRoute } from "./routes/user"
server.use('/u', userRoute);


server.all('*', (req, res) => {
  res.render('404');
});

let PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server is up and running http://localhost:${PORT}`)
})