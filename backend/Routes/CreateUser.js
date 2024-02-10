const express= require("express");

const router= express.Router()

const User=require("../models/User")
const { body, validationResult } = require('express-validator');

const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const secretKey="ThisisNoshful#"

router.post('/createuser',
body('email').isEmail(),
body('password','Invalid password length').isLength({min:5}),
body('name').isLength({min:5})
,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
        console.log(errors)
    }
    try{

        let salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(req.body.password,salt);
        await User.create({
            name:req.body.name,
            email:req.body.email,
            location:req.body.location,
            password:secPassword,
            profile:req.body.profile
        })

        res.json({success:true})
    }
    catch(e){
        console.log(e)
        res.json({success:false})
    }
})

router.post('/login',
body('email').isEmail(),
body('password','Invalid password length').isLength({min:5})
,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }
    let email=req.body.email;
    try{
        const userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"Enter valid email"})
        }
        const pwdCompare=await bcrypt.compare(req.body.password,userData.password);
        if(!pwdCompare){
            return res.status(400).json({errors:"Enter valid password"})
        }

        const data={
            user:{
                id:userData.id
            }
        }
        let userProfile=userData.profile;
        let username=userData.name;
        const authToken=jwt.sign(data,secretKey)
        return res.json({success:true,authToken,userProfile,username})
    }
    catch(e){
        console.log(e)
        res.json({success:false})
    }
})

module.exports=router;