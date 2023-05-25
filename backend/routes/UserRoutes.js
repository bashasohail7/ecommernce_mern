const express=require('express')
const {registerUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, deleteUser} =require( '../controllers/userController');
const {  isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router=express.Router()

router.post('/register',registerUser);
 router.post('/login',loginUser)
 router.put('/updatePassword',isAuthenticatedUser,updatePassword)
 router.get('/me',isAuthenticatedUser,getUserDetails)
 router.put('/me/update',isAuthenticatedUser,updateProfile)
 router.get('/logout',logoutUser)
 router.get('/admin/users',isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
 router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
 router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser)
module.exports=router