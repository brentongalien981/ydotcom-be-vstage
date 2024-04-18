const request = require("supertest");
const expect = require("chai").expect;
require("../../test-env-bootstrap");
const app = require("../../../app");
const { User } = require("../../../src/models");
const authService = require("../../../src/services/authService");



describe("Integration / Controllers / authController", () => {

  describe("authController.signup", () => {

    it("should signup a user", async () => {

      const newUserParams = { username: "kobe123", email: "a@t.com", password: "abcd1234" };

      const response = await request(app)
        .post("/auth/signup")
        .send(newUserParams);

      const retrievedUser = await User.findOne({
        where: {
          email: newUserParams.email
        }
      });

      expect(response.status).to.equal(201);
      expect(retrievedUser.username).to.equal(newUserParams.username);
      expect(retrievedUser.email).to.equal(newUserParams.email);
      expect(retrievedUser.password).to.not.equal(newUserParams.password);
      expect(response.body).to.have.property("token");

    });

  });


  describe("authController.login", () => {

    it("should login a user", async () => {

      const newUserParams = { username: "lebron1234", email: "b@a.com", password: "abcd1234" };
      const req = { body: newUserParams };

      // Create a user.
      await authService.signup(req);

      // Login
      const response = await request(app)
        .post("/auth/login")
        .send(newUserParams);


      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");
      expect(response.body.username).to.equal(newUserParams.username);

    });

  });

});