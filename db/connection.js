// for connecting mongoose to node js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Client_records", {
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);
})