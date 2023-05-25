const mongoose = require("mongoose");
const validator = require("validator");
const bcrpyt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "need a name for user"],
    maxLength: [30, "name exceeds 30 characters"],
    minLength: [4, "name length is less than 4"],
  },
  email: {
    type: String,
    required: [true, "user required an email id"],
    unique: true,
    validate: [validator.isEmail, "please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "required password"],
    minLength: [8, "password should be minimum 8 charcaters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role:{
    type:String,
    default:'user'
  },
  resetPasswordToken:{
    type:String,
    select:false
  },
  resetPasswordExpire:Date
});
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
this.password=await bcrpyt.hash(this.password,10)
})


//JWT TOKEN

userSchema.methods.getJWTToken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
})
}

// COMPARE PASSWORD
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrpyt.compare(enteredPassword,this.password)
}

//Generating Password Reset Token

userSchema.methods.getResetPasswordToken=function(){
const resetToken=crypto.randomBytes(20).toString('hex')
//hashing and add to userchema
this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
this.resetPasswordExpire=Date.now()+1000
return resetToken
}

module.exports=mongoose.model('User',userSchema)
