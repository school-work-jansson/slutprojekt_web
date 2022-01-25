const express = require("express");
const bodyParser = require("body-parser");

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
  res.send(`<p>${info.desc}</p>`)
  
})

server.get('/contact', (req, res) => { 
  res.send(`<p>contact</p>`)
  
})





const port = 3000
server.listen(port, () => {
  console.log(`Food is up and running http://localhost:${port}`)
})