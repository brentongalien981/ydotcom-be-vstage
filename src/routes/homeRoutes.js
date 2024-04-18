const express = require("express");
const My = require("../utils/My");
const NodeCache = require("node-cache");
const router = express.Router();



router.get("/", (req, res) => {
  res.status(200).json({
    msg: "Request OK for route: /",
    reqQueries: req.query
  });
});

router.get("/listQueries", (req, res) => {
  res.status(200).json({
    msg: "Request OK for route: /listQueries",
    reqQueries: req.query
  });
});

router.get("/generateUuid", (req, res) => {
  res.status(200).json({
    msg: "Request OK for route: /generateUuid",
    uuid: My.generateUuid()
  });
});


// Clear cache endpoint
router.get('/clear-cache', (req, res) => {
  const cache = new NodeCache();
  cache.flushAll();
  res.send('Cache cleared');
});


module.exports = router;