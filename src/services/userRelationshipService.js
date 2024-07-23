const db = require("../models");

const userRelationshipService = {
  follow: async (req) => {
    const authUser = req.authUser;
    const userToFollow = await db.User.findByPk(req.body.userIdToFollow);

    if (!userToFollow) {
      throw new Error("User to follow not found.");
    }

    await authUser.addFollowings([userToFollow]);
    return true;
  }
};


module.exports = userRelationshipService;