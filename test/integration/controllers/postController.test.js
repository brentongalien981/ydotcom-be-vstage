const request = require("supertest");
const app = require("../../../app");
require("../../test-env-bootstrap");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");
const db = require("../../../src/models");
const My = require("../../../src/utils/My");



describe("Integration / Controllers / postController", () => {

  describe("postController.createPost", () => {

    it("should return 201 for successful creation of post", async () => {

      // Create a user.
      const user = await db.User.create({ username: "aUsername", email: "anEmail", password: "aPassword" });

      // Generate JWT token.
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // Mock stuffs
      const authHeader = `Bearer ${token}`;
      const reqBody = { postMessage: "hello" };


      // Act
      const response = await request(app)
        .post("/posts")
        .set("Authorization", authHeader)
        .send(reqBody);


      // Assert
      expect(response.status).to.equal(201);
      expect(response.body.uploadUrl).not.to.be.null;
      expect(response.body.uploadUrl.length > 0).to.be.true;

    });


  });


  describe("postController.readPosts", () => {

    // Do this...

    it("should return 200 for successful reading of posts", async () => {

      const response = await request(app)
        .get("/posts");


      expect(response.status).to.equal(200);
      expect(response.body.posts).not.to.be.undefined;

    });


  });

});