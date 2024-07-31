const server = require("../../test-env-bootstrap");
const supertest = require('supertest');
const { expect } = require("chai");
const { generateUsers } = require("../../../src/factories/userFactory");



describe("Integration / Routes / recommendedUsersRoutes", () => {

  describe("GET route /recommendedUsersRoutes", () => {


    it("should return 200 for a successful request", async () => {

      const request = supertest(server);

      // Mock stuffs
      // Generate 20 users
      await generateUsers(20);

      // Act
      const response = await request.get("/recommendedUsers");        

      // Assert
      expect(response.status).to.equal(200);

    });

  });
});
