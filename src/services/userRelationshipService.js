const BadRequestError = require("../errors/BadRequestError");
const db = require("../models");

const userRelationshipService = {
  follow: async (req) => {
    const authUser = req.authUser;
    const userToFollow = await db.User.findByPk(req.body.userIdToFollow);

    if (!userToFollow) {
      throw new BadRequestError("User to follow not found.");
    }
    
    const isAuthFollowingUser = await userRelationshipService.isUserFollowingUser(authUser.id, userToFollow.id);
    if (isAuthFollowingUser) {
      throw new BadRequestError("You are already following the user.");
    }

    await authUser.addFollowings([userToFollow]);
    return true;
  },

  isUserFollowingUser: async (followerUserId, followingUserId) => {
    const relationship = await db.UserRelationship.findOne({
      where: {
        followerUserId: followerUserId,
        followingUserId: followingUserId
      }
    });

    return !!relationship;

  }
};


module.exports = userRelationshipService;