const mongoose = require("mongoose");
const validator = require("validator");

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
  resetPasswordToken:String,
  resetPasswordExpire:Date
});
module.exports=mongoose.model('User',userSchema)
