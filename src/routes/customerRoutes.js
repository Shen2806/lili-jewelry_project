const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");

router.get("/", CustomerController.listCustomers);
router.get("/add", CustomerController.addCustomerPage);
router.post("/add", CustomerController.addCustomer);
router.get("/edit/:id", CustomerController.editCustomerPage);
router.post("/edit/:id", CustomerController.editCustomer);
router.get("/delete/:id", CustomerController.deleteCustomerPage);
router.post("/delete/:id", CustomerController.deleteCustomer);

module.exports = router;
