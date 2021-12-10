const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require('body-parser')
const port = 80;
require("./db/connection");
 

// Defining Mongoose Schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    password: String,
    confirm_password: String,
  });
// defining model
const Contact = mongoose.model('Contact', contactSchema);

// for serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded({extended:true}))
//set the template engine as HTML
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname,'views'))
// console.log(path.join(__dirname,'views'))

// ENDPOINTS
app.get('/', (req,res)=>{
  const params = {}
  res.status(200).render('index.html', params);
});
app.get("/login_page", (req, res)=>{ 
  const params = {}
  res.status(200).render('login_page.html', params);
});
app.get("/signup_page", (req, res)=>{ 
  const params = {}
  res.status(200).render('signup_page.html', params);
});
app.get("/team", (req, res)=>{ 
   const params = {}
   res.status(200).render('team.html', params);
});
// this function will be used when user will send post request
// app.post("/signup_page.html", (req, res)=>{ 
//   console.log('post req');
//   var myData = new Contact(req.body);
//   myData.save().then(result=>{
//       console.log(result);
//       res.status(200).json({
//         newContact:result
//       })
//   }).catch(err=>{
//      console.log(err);
//      res.status(500).json({
//        error:err
//      })
//   });
// });
// app.post("/signup_page.html" , (req,res,next)=>{
//     _id:new mongoose.Schema.Types.ObjectId,
//     name = req.body.name,
//     phone = req.body.phone,
//     email = req.body.email,
//     password = req.body.password,
//     confirm_password = req.body.confirm_password,
//     console.log(`${name} and phone is ${phone}`)
//   });
app.post("/signup_page", (req, res)=>{ 
  var myData = new Contact(req.body);
  myData.save().then(()=>{
      res.send("Client Database's Data has been saved")
  }).catch((err)=>{
      res.status(400).send(err)
  });
});
app.listen(port, ()=>{
  console.log(`The app started on port ${port}`);
});
