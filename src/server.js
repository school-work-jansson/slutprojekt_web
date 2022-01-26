import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { __dirname } from "./utils";

// måste användas för att requirea
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url); 

const server = express()

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

const port = 8080
server.listen(port, () => {
  console.log(`Server is up and running http://localhost:${port}`)
})