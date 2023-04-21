const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router
    .get("/products", getAllProducts)
    .post("/product/new", createProduct)
    .put('/product/:id',updateProduct)
    .delete('/product/:id',deleteProduct)

module.exports = router;
