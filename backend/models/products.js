const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "need a product name"],
  },
  description: {
    type: String,
    required: [true, "need  product description"],
  },
  price: {
    type: Number,
    required: [true, "need product price"],
    maxlength: [8, "price length cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true,"need product category"],
  },
  stock:{
    type:Number,
    required:[true,"need stock of the product"],
    maxlength:[4,"Stock cannot exceed 4 chaarcaters"]
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  reviews:[
    {
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String
        }
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now()
  }
});
module.exports=mongoose.model("Product",productSchema)
