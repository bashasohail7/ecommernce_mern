const express = require("express");
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router=express.Router()

router.post('/order/new',isAuthenticatedUser,newOrder)
       .get('/order/:id',isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder)
       .get('/orders/me',isAuthenticatedUser,getMyOrders)
       .get('/admin/orders',isAuthenticatedUser,authorizeRoles('admin'),getAllOrders)
       .put('/admin/order/:id',isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
       .delete('/admin/order/:id',isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)


module.exports=router
