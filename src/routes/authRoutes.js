const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

//  Đăng ký tài khoản
router.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
    "confirm-password": confirmPassword,
    role,
  } = req.body;

  // Kiểm tra mật khẩu nhập lại
  if (password !== confirmPassword) {
    return res.status(400).send("Mật khẩu không khớp!");
  }

  // Kiểm tra email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Email đã được đăng ký!");
  }

  // Kiểm tra username đã tồn tại chưa
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).send("Username đã tồn tại!");
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo tài khoản mới
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  });
  await newUser.save();

  res.redirect("/login");
});

//  Đăng nhập
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Sai email hoặc mật khẩu!");
  }

  // Lưu session
  req.session.user = { id: user._id, username: user.username, role: user.role };

  // Chuyển hướng theo quyền
  if (user.role === "admin") {
    res.redirect("/admin");
  } else {
    res.redirect("/");
  }
});

//  Đăng xuất
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
