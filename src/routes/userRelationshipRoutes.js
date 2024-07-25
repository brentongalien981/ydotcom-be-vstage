const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const userRelationshipController = require("../controllers/userRelationshipController");


const router = express.Router();


router.post("/follow", authMiddleware.isLoggedIn, userRelationshipController.follow);


module.exports = router;