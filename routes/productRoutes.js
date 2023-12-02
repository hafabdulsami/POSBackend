const express = require("express");
const router = express.Router();
const { checkAuthority } = require("../utils/checkAuthority");
const productController = require("../controller/productController");

router.post("/addProduct", checkAuthority, productController.addProduct);
router.get("/productList", checkAuthority, productController.ProductList);
router.put("/editProduct",checkAuthority,productController.editProduct);

module.exports = router;
