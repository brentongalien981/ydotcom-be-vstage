const db = require("../models");

const recommendedUsersService = {
  readRecommendedUsers: async (req) => {

    // An array to hold the ids of the users that the authUser is following.
    let followingIds = [];

    // If the request is authenticated, get the followings of the authUser.
    // Otherwise, the followingIds will be an empty array.
    if (req.isLoggedIn) {
      // Get authUser's followings (users it already follows).
      const followings = await req.authUser.getFollowings();
      // Map the followings to their ids.
      followingIds = followings.map(f => f.id);
      // Also include authUser's id so that it is not recommended.
      followingIds.push(req.authUser.id);
    }



    // Query users from db by random order. 
    // Exclude the users that authUser is already following.
    // Only include the users username and exclude the rest of their properties.
    // Convert the query result to an array of plain objects.
    const users = await db.User.findAll({
      where: {
        id: {
          [db.Sequelize.Op.notIn]: followingIds
        }
      },
      order: db.sequelize.random(),
      attributes: ["username"],
      limit: 10,
      raw: true
    });

    return users;
  }
};

module.exports = recommendedUsersService;