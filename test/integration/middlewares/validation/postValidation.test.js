const request = require("supertest");
const app = require("../../../../app");
require("../../../test-env-bootstrap");
const { User } = require("../../../../src/models");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");



describe("Integration / Middlewares / Validation / postValidation", () => {

  describe("postValidation.createPost", () => {

    it("should return 400 if post content message does not exist", async () => {

      // Create a user.
      const user = await User.create({ username: "aUsername", email: "anEmail", password: "aPassword" });

      // Generate JWT token.
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // Mock stuffs
      const authHeader = `Bearer ${token}`;
      // const reqBody = { postMessage: "hello" };
      const reqBody = null;


      // Act
      const response = await request(app)
        .post("/posts")
        .set("Authorization", authHeader)
        .send(reqBody);


      // Assert
      expect(response.status).to.equal(400);
      expect(response.body.errors[0]).to.deep.include({ path: "postMessage", msg: "Post message content is required" });

    });


    it("should return 400 if post content message is empty", async () => {

      // Create a user.
      const user = await User.create({ username: "aUsername", email: "anEmail", password: "aPassword" });

      // Generate JWT token.
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // Mock stuffs
      const authHeader = `Bearer ${token}`;
      const reqBody = { postMessage: "" };


      // Act
      const response = await request(app)
        .post("/posts")
        .set("Authorization", authHeader)
        .send(reqBody);


      // Assert
      expect(response.status).to.equal(400);
      expect(response.body.errors[0]).to.deep.include({ path: "postMessage", msg: "Post message content is required" });
      expect(response.body.errors[1]).to.deep.include({ path: "postMessage", msg: "Post message content must be at least 1 character" });

    });


    it("should return a response with no body errors if post message content is valid", async () => {

      // Create a user.
      const user = await User.create({ username: "aUsername", email: "anEmail", password: "aPassword" });

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
      expect(response.body.errors).to.be.undefined;

    });

  });

});