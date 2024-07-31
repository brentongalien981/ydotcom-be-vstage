const express = require("express");
const recommendedUsersController = require("../controllers/recommendedUsersController");


const router = express.Router();


router.get("/", recommendedUsersController.readRecommendedUsers);


module.exports = router;