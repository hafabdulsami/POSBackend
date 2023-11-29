const express = require("express");
const router = express.Router();
const { checkAuthority } = require("../utils/checkAuthority");
const companyController = require("../controller/companyController");

router.post("/addCompany", checkAuthority, companyController.addCompany);
//router.get("/supplierList",checkAuthority,supplierController.supplierList);
//router.put("/editSupplier",checkAuthority,supplierController.editSupplier);

module.exports = router;
