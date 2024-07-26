const profileService = require("../services/profileService");
const userRelationshipService = require("../services/userRelationshipService");


const profileController = {

  readProfile: async (req, res, next) => {

    try {
      const { username } = req.params;
      const profile = await profileService.readProfile(username);

      let isAuthFollowingTheUser = false;
      if (req.isLoggedIn) {
        isAuthFollowingTheUser = await userRelationshipService.isUserFollowingUser(req.authUser.id, profile.userId);
      }


      res.json({
        msg: "Request OK for get route: /profile/:username",
        profile,
        isAuthFollowingTheUser
      });

    } catch (e) {
      return next(e);
    }
  }

};


module.exports = profileController;