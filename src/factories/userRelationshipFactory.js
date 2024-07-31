const My = require("../utils/My");


function generateRandomUserRelationships(users) {

  const relationshipsAttribs = [];

  // Loops through all users as someone being followed.
  for (const userBeingFollowed of users) {

    const maxNumOfFollowers = 5;
    const numOfFollowers = My.getRandomNumber(0, maxNumOfFollowers + 1);

    // Create an array of user ids that are already being followed by the user for checking.
    // Initialize it with the user being followed so that the user will not follow itself.
    const userIdsBeingFollowedByUser = [userBeingFollowed.id];

    for (let i = 0; i < numOfFollowers; i++) {

      // Randomly select a follower from the users array.
      const randomIndex = My.getRandomNumber(0, users.length - 1);

      const follower = users[randomIndex];
      if (userIdsBeingFollowedByUser.includes(follower.id)) {
        continue;
      }

      // Create a relationship.
      relationshipsAttribs.push({
        followerUserId: follower.id,
        followingUserId: userBeingFollowed.id
      });

      userIdsBeingFollowedByUser.push(follower.id);

    }

  }

  return relationshipsAttribs;
}


module.exports = {
  generateRandomUserRelationships
};