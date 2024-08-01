const profileService = require("../services/profileService");
const userRelationshipService = require("../services/userRelationshipService");


const profileController = {

  readProfile: async (req, res, next) => {

    try {
      const { username } = req.params;
      const profile = await profileService.readProfile(username);

      // Dynamically add a property to the profile object.
      profile.isAuthFollowingTheUser = false;
      if (req.isLoggedIn) {
        profile.isAuthFollowingTheUser = await userRelationshipService.isUserFollowingUser(req.authUser.id, profile.userId);
      }


      res.json({
        msg: "Request OK for get route: /profile/:username",
        profile
      });

    } catch (e) {
      return next(e);
    }
  }

};


module.exports = profileController;