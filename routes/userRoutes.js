const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

//getusers
userRouter.get("/getuser", userController.getUsers);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;
