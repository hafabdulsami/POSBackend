const express = require("express");
const router = express.Router();
const { checkAuthority } = require("../utils/checkAuthority");
const supplierController = require("../controller/supplierController");

router.post("/addSupplier",checkAuthority,supplierController.addSupplier);
router.get("/supplierList",checkAuthority,supplierController.supplierList);
router.put("/editSupplier",checkAuthority,supplierController.editSupplier);


module.exports = router;