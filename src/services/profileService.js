const db = require("../models");

const profileService = {

  readProfile: async (username) => {

    const user = await db.User.findOne({ where: { username: username } });

    if (!user) {
      throw new Error("User not found.");
    }

    let profile = await user.getProfile();
    profile = profile.toJSON();
    profile.username = user.username;
    profile.email = user.email;
    return profile;

  },

};


module.exports = profileService;