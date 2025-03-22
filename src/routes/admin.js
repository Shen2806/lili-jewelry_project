const express = require("express");
const router = express.Router();
const Product = require("../models/product"); // Import Product model
const multer = require("multer");

// Cấu hình lưu trữ file hình ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route hiển thị danh sách sản phẩm
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("product", { products });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
  }
});

// Route thêm sản phẩm mới
router.post("/products/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const image = req.file ? req.file.filename : null; // Lưu đường dẫn ảnh nếu có

    const newProduct = new Product({ name, price, description, image, stock });
    await newProduct.save();

    res.redirect("/admin/products"); // Reload lại trang danh sách sản phẩm
  } catch (error) {
    res.status(500).send("Lỗi khi thêm sản phẩm");
  }
});

// Route xóa sản phẩm
router.get("/products/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin/products");
  } catch (error) {
    res.status(500).send("Lỗi khi xóa sản phẩm");
  }
});

// Route chỉnh sửa sản phẩm
router.post("/products/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const updateData = { name, price, description, stock };

    if (req.file) {
      updateData.image = req.file.filename; // Cập nhật hình ảnh mới nếu có
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/admin/products");
  } catch (error) {
    res.status(500).send("Lỗi khi chỉnh sửa sản phẩm");
  }
});

module.exports = router;
