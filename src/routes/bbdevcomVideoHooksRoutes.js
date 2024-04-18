const express = require("express");
const bbdevcomVideoHookController = require("../controllers/bbdevcomVideoHookController");
const bbdevcomVideoHookValidation = require("../middlewares/validation/bbdevcomVideoHookValidation");
const router = express.Router();


router.post("/onVideoReady", bbdevcomVideoHookValidation.onVideoReady, bbdevcomVideoHookController.onVideoReady);



module.exports = router;