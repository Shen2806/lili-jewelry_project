const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// Hiển thị trang chính với danh sách sản phẩm
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("index", { products });
});

// Xem chi tiết sản phẩm
router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("productDetail", { product });
});

module.exports = router;
