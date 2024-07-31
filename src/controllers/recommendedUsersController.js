const recommendedUsersService = require("../services/recommendedUsersService");

const recommendedUsersController = {
  readRecommendedUsers: async (req, res, next) => {
    try {

      const recommendedUsers = await recommendedUsersService.readRecommendedUsers(req);

      res.status(200).json({
        msg: "Request OK for get route: /recommendedUsers",
        recommendedUsers
      });
    } catch (e) {
      return next(e);
    }
  }
};


module.exports = recommendedUsersController;