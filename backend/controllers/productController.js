const Product = require("../models/products");

//create product -- admin
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//get all products
exports.getAllProducts = async (req, res,next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};
exports.updateProduct = async (req, res,next) => {
    try {
        
     const  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        res.status(200).json({
          success:true,
          product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "somethung went wrong",
          });
    }
 
};


exports.deleteProduct=async(req,res,next)=>{

    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
          success:true,
          message:'deleted succesfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went found",
          });
    }
  

}
