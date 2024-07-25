const server = require("../../test-env-bootstrap");
const supertest = require('supertest');
const { expect } = require("chai");
const { generateAuthUser, generateUser } = require("../../../src/factories/userFactory");



describe("Integration / Routes / userRelationshipRoutes", () => {

  describe("POST route /userRelationships/follow", () => {

    it("should return 400 for a bad request", async () => {

      const request = supertest(server);

      // Mock stuffs
      // Generate auth user to have a valid token.
      const { user, token } = await generateAuthUser();
      // Create request header.
      const authHeader = `Bearer ${token}`;

      const mockReqBody = { userIdToFollow: "non-existent-id" };


      // Act
      const response = await request.post("/userRelationships/follow")
        .set("Authorization", authHeader)
        .send(mockReqBody)


      // Assert
      expect(response.status).to.equal(400);

    });



    it("should return 201 for a successful request", async () => {

      const request = supertest(server);

      // Mock stuffs
      // Generate auth user to have a valid token.
      const { user, token } = await generateAuthUser();
      /// Generate another user to follow.
      const userToFollow = await generateUser();
      // Create request header.
      const authHeader = `Bearer ${token}`;

      const mockReqBody = { userIdToFollow: userToFollow.id };


      // Act
      const response = await request.post("/userRelationships/follow")
        .set("Authorization", authHeader)
        .send(mockReqBody)


      // Assert
      expect(response.status).to.equal(201);

    });

  });
});
