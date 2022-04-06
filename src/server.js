import express from "express";
import bodyParser from "body-parser";
import path from "path";
import session from 'express-session';

import { v4 as uuid } from 'uuid';

import { __dirname } from "./utils";

import { save_last_site_visited } from './middleware';

const server = express()

// Sätter CORS headers
// import helmet from 'helmet';
// server.use(helmet() 
// );

// {
//   crossOriginResourcePolicy: { policy: "cross-origin" },
//   contentSecurityPolicy: {
//     directives: {
//       "default-src": ["'self'"],
//       "base-uri": "'self'",
//       "font-src": ["'self'","https:","data:"],
//       "frame-ancestors": ["'self'"],
//       "img-src": ["'self'", "https://cdn.discordapp.com/", "https://media1.tenor.com/"],
//       "object-src": ["'none'"],
//       "script-src": ["'self'","https://code.jquery.com/","https://kit.fontawesome.com/"],
//       "script-src-attr": ["'self'", "https://code.jquery.com/","https://kit.fontawesome.com/"],
//       "style-src": ["'self'", "https://fonts.googleapis.com/"],
//     }
//   }
// }

// https://github.com/chill117/express-mysql-session
/* 
  The secret should be a random string of characters. 
  Ideally you would also change it periodically in case it has been discovered. 
  However, this requires support for secret rotation so you don't immediately invalidate existing sessions. 
  That is, two session secrets should be considered valid simultaneously.
  To my knowledge, Express doesn't have support for rotating secrets at this time. 
  https://stackoverflow.com/questions/43887865/what-is-a-secure-session-secret
  https://www.npmjs.com/package/session-file-store kke den här bara för exempel istället för att spara i minnet

  https://expressjs.com/en/resources/middleware/session.html
*/
let session_age = 1000 * 60 * 24
server.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  genid: () => {
    return uuid() // use UUIDs for session IDs
  },
  // store: 
  cookie: {
    maxAge: session_age,
    // expires: false // Note The expires option should not be set directly; instead only use the maxAge option.
  }
}))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(express.static(path.join(__dirname, 'static'))); // Static files as stylesheets and scripts
server.set('views', path.join(__dirname, 'pages')); // SSR webpages (index, contact, profile, login)
server.set('view engine', 'ejs');

import { mailRoute } from './routes/mail'
server.use('/contact', mailRoute)

import { userRoute } from "./routes/user"
server.use('/u', userRoute);

import { productRoute } from "./routes/product"
server.use('/p', productRoute)

import { apiRoute } from "./routes/api"
server.use('/api', apiRoute)

import { rootRoute } from './routes/root'
server.use('/', rootRoute)

// 404
server.use((req, res, next) => {
  return res.status(404).render('404');
})

// Any error
server.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).send(err);
});


let PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server is up and running http://localhost:${PORT}`)
})