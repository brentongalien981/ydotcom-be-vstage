const db = require("../models");

const profileService = {

  readProfile: async (username) => {

    const user = await db.User.findOne({ where: { username: username } });

    if (!user) {
      throw new Error("User not found.");
    }

    return await user.getProfile();

  }

};


module.exports = profileService;