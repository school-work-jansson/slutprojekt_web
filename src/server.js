import express from "express";
import bodyParser from "body-parser";

// måste användas för att requirea
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url); 

const server = express()

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

let info = {
  desc: "Det här projektet kommer att vara lite som trustpilot fast istället för att vara inriktad på företag i sig så kommer den att targeta recenssion av matprodukter från olika företag."
}

server.get('/', (req, res) => { 
  res.send(`<p>${info.desc}</p>`)
})

server.get('/about', (req, res) => { 
  res.send(`<p>${info.desc}</p>`);
})

import { mailRoute } from './routes/mail'
server.use('/contact', mailRoute)

import { authRoute } from "./routes/user"
server.use('/u', authRoute);


const port = 8080
server.listen(port, () => {
  console.log(`Server is up and running http://localhost:${port}`)
})