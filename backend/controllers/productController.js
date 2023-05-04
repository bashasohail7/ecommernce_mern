const Product = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
//create product -- admin
  exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  })
 

//get all products
exports.getAllProducts=catchAsyncErrors(async(req,res,next)=>{
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
})


//only admin
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
 
})

// only Admin
exports.deleteProduct =catchAsyncErrors( async (req, res, next) => {
    await Product.findByIdAndDelete(req.params.id);
})

exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    product,
  });
});

