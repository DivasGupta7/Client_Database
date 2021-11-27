const express = require("express");
const path = require("path");
const http = require('http');
const app = express();
const hostname = '127.0.0.1';
const port = 80;

// app.use('/static', express.static('static'))
app.use(express.urlencoded())
//set the template engine as HTML
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname,'views'))

// ENDPOINTS
app.get('/', (req,res)=>{
  const params = {}
  res.status(200).render('index.html', params);
})
app.get("/team", (req, res)=>{ 
   const params = {}
   res.status(200).render('team.html', params);
});
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});