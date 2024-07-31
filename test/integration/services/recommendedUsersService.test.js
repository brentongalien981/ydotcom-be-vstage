require("../../test-env-bootstrap");
const { expect } = require("chai");
const { generateUsers, generateAuthUser } = require("../../../src/factories/userFactory");
const db = require("../../../src/models");
const recommendedUsersService = require("../../../src/services/recommendedUsersService");
const My = require("../../../src/utils/My");


describe("Integration / Services / recommendedUsersService", () => {


  describe("recommendedUsersService.readRecommendedUsers", () => {

    it("should read recommended users for a guest user", async () => {

      // Generate 20 users.
      await generateUsers(20);

      // Mock request.
      const mockReq = {};

      // Call the service.
      const users = await recommendedUsersService.readRecommendedUsers(mockReq);

      // Query the db for details to be used to assert.
      const numAllDbUsers = await db.User.count();


      // Assert
      expect(numAllDbUsers).equals(20);
      expect(users.length).equals(10);
      expect(users[0]).to.have.property("username");

      // Assert that the userId attrib of users is not present.
      expect(users[0]).to.not.have.property("id");

    });


    it("should read recommended users for authenticated user", async () => {

      // Generate an auth user.
      const auth = await generateAuthUser();
      const authUser = auth.user;

      // Generate 5 users that authUser follows.
      const usersToFollow = await generateUsers(5);

      // Generate 8 users that authUser does not follow.
      const usersNotFollowed = await generateUsers(8);

      // Make authUser follow the usersToFollow.
      for (const u of usersToFollow) {
        await db.UserRelationship.create({ followerUserId: authUser.id, followingUserId: u.id });
      }


      // Mock request.
      const mockReq = {
        isLoggedIn: true,
        authUser
      };

      // Call the service.
      const recommendedUsers = await recommendedUsersService.readRecommendedUsers(mockReq);

      // Query the db for details to be used to assert.
      const numAllDbUsers = await db.User.count();

      // Map the recommendedUsers to their usernames.
      const recommendedUsernames = recommendedUsers.map(u => u.username);


      // Assert
      expect(numAllDbUsers).equals(14);
      expect(recommendedUsers.length).equals(8);
      expect(recommendedUsers[0]).to.have.property("username");

      // Assert that the userId attrib of users is not present.
      expect(recommendedUsers[0]).to.not.have.property("id");

      // Assert that each user in usersNotFollowed is in recommendedUserNames.
      for (const u of usersNotFollowed) {
        expect(recommendedUsernames).to.include(u.username);
      }

    });

  });


});