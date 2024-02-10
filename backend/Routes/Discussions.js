const express= require("express");

const router= express.Router()
const Discussion=require('../models/Discussion')
const mongoose=require("mongoose")


router.post("/discussions",async(req,res)=>{
    try{
        const fetch_discussions= await mongoose.connection.db.collection("discussions");
        const disc_data=await fetch_discussions.find({}).toArray();
        console.log(disc_data)
        res.send([disc_data]);
    }
    catch(e){
        console.log(e)
        res.send("Server error");
    }
})

router.post("/discussions/post",async(req,res)=>{
    
      console.log("In serverside discussions",req.body.message_data);
        console.log(typeof(req.body.message_data))
        let data = req.body.message_data
        

        console.log("data is",data);

        try {
             await Discussion.create({
                 email: data.email,
                 thread:data.message
             }).then(() => {
                 res.json({ success: true })
             })
         } catch (error) {
             console.log("error is",error.message)
             res.send("Server Error", error.message)
         }
})

module.exports=router;