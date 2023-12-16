const express = require('express');
const route = require('./route/routes')
const mongoose = require('mongoose')
const multer= require("multer");

const app = express();

app.use(express.json())
app.use(multer().any()) 

mongoose.connect("mongodb+srv://Mdfaizan:RiVxr7MTYxhKnQAR@cluster0.vaxmuig.mongodb.net/SMS",{useNewUrlParser:true})

.then(()=>console.log("mongodb connected"))
.catch(err => console.log(err))

app.use('/',route)



app.listen(process.env.PORT || 3000,function(){
    console.log('express app running on port '+ (process.env.PORT || 3000))
})