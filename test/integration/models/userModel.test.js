require("../../test-env-bootstrap");
const { expect } = require("chai");
const { generateAuthUser, generateUsers } = require("../../../src/factories/userFactory");
const db = require("../../../src/models");
const My = require("../../../src/utils/My");


describe("Integration / Models / user", () => {

  describe("user", () => {

    it("should get users that it follows", async () => {

      // Generate an auth user.
      const auth = await generateAuthUser();
      const authUser = auth.user;

      // Generate 5 users to follow.
      const usersToFollow = await generateUsers(5);

      // Make authUser follow the usersToFollow.
      for (const u of usersToFollow) {
        await db.UserRelationship.create({ followerUserId: authUser.id, followingUserId: u.id });
      }

      // Get the users that authUser follows.
      const queriedUsersBeingFollowed = await authUser.getFollowings();

      // Map the queriedUsersBeingFollowed to an array of usernames.
      const queriedUsernamesBeingFollowed = queriedUsersBeingFollowed.map(u => u.username);


      // Assert that each of the usersToFollow is in queriedUsernamesBeingFollowed.
      for (const u of usersToFollow) {
        expect(queriedUsernamesBeingFollowed).to.include(u.username);
      }

    });

  });

});