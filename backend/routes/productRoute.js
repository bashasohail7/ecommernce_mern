const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

const router = express.Router();

router
    .get("/products", getAllProducts)
    .get('/product/:id',getProductById)
    .post("/product/new", createProduct)
    .put('/product/:id',updateProduct)
    .delete('/product/:id',deleteProduct)

module.exports = router;
