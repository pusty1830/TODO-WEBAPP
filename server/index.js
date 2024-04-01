const mongoose=require('mongoose');
const dotenv = require('dotenv').config();
const express = require('express');
const cors= require('cors');


const app=express();
const todoitempost=require('./routes/todoitems');

//use express.json to get the data in json format ;
app.use(express.json());
//port defining 
const port=process.env.PORT||5000;

//use cors
app.use(cors()); 



mongoose.connect(process.env.DB_connection)
.then(()=> console.log("DB connected successfully"))
.catch((e)=> console.log("Eror"))

app.use('/',todoitempost);


//addthe port for connect the server 
app.listen(port,()=>{
    console.log("done successfully")
})