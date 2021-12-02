const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require('body-parser')
const port = 80;

// for connecting mongoose to node js
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Client_records');
}


// Defining Mongoose Schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    Email: String,
    password: String,
    confirm_password: String,
  });
// defining model
const Contact = mongoose.model('Contact', contactSchema);

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
app.get("/signup_page.html", (req, res)=>{ 
  const params = {}
  res.status(200).render('signup_page.html', params);
});
// app.get("/team", (req, res)=>{ 
//    const params = {}
//    res.status(200).render('team.html', params);
// });
app.post("/signup_page.html", (req, res)=>{ 
  var myData = new Contact(req.body);
  myData.save().then(()=>{
      res.send("Thanks for contacting us")
  }).catch(()=>{
      res.status(400).send("Items not saved to the databases")
  });
});
app.listen(port, ()=>{
  console.log(`The app started on port ${port}`);
});
