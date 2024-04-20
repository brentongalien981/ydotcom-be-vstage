const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notificationController");


const router = express.Router();


router.post("/queryNumOfUnreadNotifications", authMiddleware.isLoggedIn, notificationController.queryNumOfUnreadNotifications);


module.exports = router;