const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require('body-parser')
const port = 80;

// for serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())
//set the template engine as HTML
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname,'views'))

// ENDPOINTS
app.get('/', (req,res)=>{
  const params = {}
  res.status(200).render('index.html', params);
});
app.get("/login_page.html", (req, res)=>{ 
  const params = {}
  res.status(200).render('login_page.html', params);
});
// app.get("/team", (req, res)=>{ 
//    const params = {}
//    res.status(200).render('team.html', params);
// });
app.listen(port, ()=>{
  console.log(`The app started on port ${port}`);
});
