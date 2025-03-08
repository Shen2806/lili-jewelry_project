const axios = require("axios");
const fs = require("fs");

async function crawlWebsite(url) {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;

    // Lưu toàn bộ nội dung HTML vào file .ejs
    fs.writeFileSync(
      "website.ejs",
      `<%- include('header') %>\n${htmlContent}\n<%- include('footer') %>`,
      "utf-8"
    );
    console.log("Đã lưu toàn bộ dữ liệu HTML vào website.ejs");
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ trang web:", error);
  }
}

// URL trang web cần crawl
const url = "https://lili.vn/"; // Thay thế bằng URL thực tế
crawlWebsite(url);
