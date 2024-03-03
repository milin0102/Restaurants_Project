const express = require("express");
const cors = require("cors")
const figlet = require("figlet")
const app = express()
const db = require("./db")
const routes = require("../routes")
const mongoose = require("mongoose")

const init = async ()=>{

app.use(express.json());
app.use(cors());
app.use("/api",routes)
require('dotenv').config()
//database connection
db.connectToDb().then(function(){
    start();
})


}

const start = ()=>{
    //Port to connect to app
const port = process.env.PORT || 3000
app.listen(port , (err)=>{
    if (err) console.log(err);
    console.log("Server listening on PORT: " + port);
})

//project name
figlet.text("Restaurant Management",function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  })

}   

exports.init = init;
exports.start = start;
