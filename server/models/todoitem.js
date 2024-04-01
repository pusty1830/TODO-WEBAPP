//to creat schema import the mongoose
const mongoose=require('mongoose');


//creating an schema
const Todoitem=new mongoose.Schema({
    item:{
        type:String,
        required:true
    }
})


//export the schema


module.exports=mongoose.model('todo',Todoitem);