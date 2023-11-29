const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { checkAuthority } = require("../utils/checkAuthority");
router.get("/login", userController.login);
router.post("/addUser", checkAuthority, userController.addUser);
router.get("/UserList",checkAuthority ,userController.userList);
router.put("/editUser",checkAuthority,userController.editUser);
//router.post("/create", userController.createUser);
//
//router.post("/adminDashBoard", requireRoles(['Admin', 'user']), userController.adminDashBoard);
//
//router.post("/signup", userController.signUp);
//
//router.get("/getAll", userController.getAllUsers);
//
//router.put("/update/:id", userController.updateUser);
//
//router.delete("/delete/:id", userController.deleteUser);
//
//router.post("/auth", userController.authUser);
//
module.exports = router;
