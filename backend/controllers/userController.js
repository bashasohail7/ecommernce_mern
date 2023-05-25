const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "avatar url",
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given password and email borderWidth
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("inavlid email or password", 401));
  }
  sendToken(user, 200, res);
});

// exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
//     const user=await User.findOne({email:req.body.email})
//     if(!user){
//         return next(new ErrorHandler("user not found",404))
//     }
//     const resetToken= user.getResetPasswordToken()
//     await user.save({validateBeforeSave:false})
//     // const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
//     const resetPasswordUrl=`http://localhost/api/v1/password/reset/${resetToken}`

//     const message=`Your password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this email...`

//     try {
//         await sendEmail({
//             email:user.email,
//             subject:'Ecommerce PAssword Recovery',
//             message
//         })
//         res.status(200).json({
//             success:true,
//             message:'Email sent succesfully'
//         })
//     } catch (error) {
//         user.resetPasswordToken=undefined;
//         user.resetPasswordExpire=undefined
//         return next(new ErrorHandler(error.message,500))
//     }
// })

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  console.log("first", user);
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  console.log("is[assword", isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid email or password", 401));
  }
  if (req.body.newpassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("passwords doesnt match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user doesnt exist", 401));
  }
  res.status(200).json({
    success: true,
    user,
  });
});


exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
   const user=  await User.findByIdAndDelete(req.params.id);
   if(!user){
    return next(new ErrorHandler('User doesnt exist with'))
   }
   await user.remove()
   res.status(200).json({
      success: true,
    });
  });
