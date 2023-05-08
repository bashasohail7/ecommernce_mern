const Product = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
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
  const resultsPerPage=Number(req.query.limit);
  // const resultsPerPage=1;
  // console.log("resultsperpage query===>",req.query.resultsPerPage)
  const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultsPerPage)
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
})


//only admin
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
  console.log('req ===>',req.params.id)
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

