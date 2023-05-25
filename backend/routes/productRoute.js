const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.get("/products",isAuthenticatedUser,authorizeRoles('admin'),getAllProducts)

router.post("admin/product/new",isAuthenticatedUser,authorizeRoles('admin'), createProduct)

router.get('/product/:id',getProductById)

router.route('admin/product/:id')
    .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct)

router.put('/review',isAuthenticatedUser,createProductReview)

router.route('/reviews')
       .get(getProductReviews)
       .delete(deleteReview)

module.exports = router;
