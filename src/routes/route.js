const express = require("express");
const app = express();

// Cấu hình template engine (ví dụ EJS)
app.set("view engine", "ejs");

// Trang chủ quản lý sản phẩm
app.get("/admin/products", (req, res) => {
  res.render("product"); // Chuyển hướng tới trang product.ejs
});

// Các route khác
app.get("/admin/orders", (req, res) => {
  res.render("orders");
});
app.get("/admin/customers", (req, res) => {
  res.render("customers");
});
app.get("/admin/employees", (req, res) => {
  res.render("employees");
});
app.get("/admin/promotions", (req, res) => {
  res.render("promotions");
});
app.get("/admin/reports", (req, res) => {
  res.render("reports");
});

// Lắng nghe server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
