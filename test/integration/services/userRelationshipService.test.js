require("../../test-env-bootstrap");
const { expect } = require("chai");
const db = require("../../../src/models");
const { generateUser, generateUsers } = require("../../../src/factories/userFactory");
const userRelationshipService = require("../../../src/services/userRelationshipService");
const My = require("../../../src/utils/My");


describe("Integration / Services / userRelationshipService", () => {


  describe("userRelationshipService.follow", () => {

    it("should follow a user", async () => {

      // Create a user that will follow another users.
      const sourceUser = await generateUser();

      // Generate 10 users to be followed.
      const usersToFollow = await generateUsers(5);


      // Follow all users by calling the service 5 times.
      for (const u of usersToFollow) {

        // Mock request.
        const mockReq = {
          authUser: sourceUser,
          body: {
            userIdToFollow: u.id
          }
        };

        // Call the service.
        const isResultOk = await userRelationshipService.follow(mockReq);

      }

      // Query the db for details to be used to assert.
      const followedUsers = await sourceUser.getFollowings();
      const followedUsersIds = followedUsers.map(u => u.id);
      const allCreatedRelationships = await db.UserRelationship.findAll();


      // Assert
      expect(followedUsers.length).equal(5);
      expect(allCreatedRelationships.length).equal(5);

      for (const relationship of allCreatedRelationships) {
        expect(relationship.followerUserId).equal(sourceUser.id);
        expect(relationship.followingUserId).to.be.oneOf(followedUsersIds);
      }

    });

  });

});