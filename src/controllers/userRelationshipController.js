const authMiddleware = require("../middlewares/authMiddleware");
const userRelationshipService = require("../services/userRelationshipService");

const userRelationshipController = {
  follow: async (req, res, next) => {
    try {
      await userRelationshipService.follow(req);

      res.status(201).json({
        msg: "Request OK for POST route: /userRelationships/follow",
        isResultOk: true
      });

    } catch (e) {
      return next(e);
    }
  }
};


module.exports = userRelationshipController;