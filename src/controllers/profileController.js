const profileService = require("../services/profileService");


const profileController = {

  readProfile: async (req, res, next) => {

    try {
      const { username } = req.params;
      const profile = await profileService.readProfile(username);

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