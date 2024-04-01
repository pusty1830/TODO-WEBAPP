const router=require('express').Router();


//import todomodels

const todoitemmodel=require('../models/todoitem');


router.post('/api/item',async(req,res)=>{
    try{
        const newItem= new todoitemmodel({
            item:req.body.item
        })
        //save item
        const saveitem=await newItem.save();
        res.status(200).json(saveitem);

    }
    catch(e){
        res.json(e)

    }
})
//getdata
router.get('/api/items',async(req,res)=>{
    try{
     const alltodoitemmodel= await todoitemmodel.find({});
     res.status(200).json(alltodoitemmodel);
    }
    catch(e){
        res.json(e)
    }
    

})
//update data
router.put('/api/item/:id',async(req,res)=>{
    try {
        const updateitem=await todoitemmodel.findByIdAndUpdate(req.params.id,{$set:req.body})
        res.status(200).json("item updated");
    } catch (error) {
        res.json(error)
    }
})


//delete data
router.delete('/api/item/:id',async(req,res)=>{
    try {
        const deleteitem=await todoitemmodel.findByIdAndDelete(req.params.id)
        res.status(200).json('item deleted successfully')
    } catch (error) {
        console.log(error);
    }
})


//export the data
module.exports=router;