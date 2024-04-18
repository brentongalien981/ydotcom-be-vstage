const express = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const postValidation = require("../middlewares/validation/postValidation");


const router = express.Router();


router.get("/", postController.readPosts);
router.post("/", authMiddleware.isLoggedIn, postValidation.createPost, postController.createPost);


module.exports = router;