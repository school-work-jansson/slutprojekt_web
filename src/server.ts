
import express from "express";

const server = express()


let info = {
  desc: "Det här projektet kommer att vara lite som trustpilot fast istället för att vara inriktad på företag i sig så kommer den att targeta recenssion av matprodukter från olika företag."
}

server.get('/', (req, res) => { 
    res.send(`<p>${info.desc}</p>`)
})

server.get('/about', (req, res) => { 
  res.send(`<p>About</p>`)
  
})

server.get('/contact', (req, res) => { 
  res.send(`<p>contact</p>`)
  
})

server.post('/send_message', (req, res) => { 
  res.redirect('/contact')
  console.log("User requested to send a mail")
  
})

server.post('/login', (req, res) => { 
  console.log("User requested login")
  res.redirect('/')
})

server.post('/signout', (req, res) => { 
  console.log("User requested Signout")
  res.redirect('/')
})


const port = 3000
server.listen(port, () => {
  console.log(`Food is up and running http://localhost:${port}`)
})