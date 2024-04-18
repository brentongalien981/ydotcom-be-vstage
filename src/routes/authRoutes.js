const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const userValidation = require("../middlewares/validation/userValidation");


const router = express.Router();


router.get("/randomCreateUser", authController.randomCreateUser);
router.get("/getUsers", authController.getUsers);
router.post("/signup", authMiddleware.isGuest, userValidation.createUser, authController.signup);
router.post("/login", authMiddleware.isGuest, userValidation.loginUser, authController.login);


module.exports = router;