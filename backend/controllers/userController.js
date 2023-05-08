const catchAsyncErrors =require("../middlewares/catchAsyncErrors");

const User=require('../models/userModel')
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:'sample id',
            url:'avatar url'
        }
    })
    res.status(201).json({
        success:true,
        user
    })
})