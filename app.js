const express = require("express");
const session = require("express-session");
const connectDB = require("./src/config/dbconnect");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const adminRoutes = require("./src/routes/admin");

const app = express();

// Kết nối MongoDB
connectDB();

// Cấu hình session
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sử dụng EJS
app.set("view engine", "ejs");

// Routes
app.use("/", productRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
