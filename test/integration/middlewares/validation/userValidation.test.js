const request = require("supertest");
const expect = require("chai").expect;
require("../../../test-env-bootstrap");
const app = require("../../../../app");
const { User } = require("../../../../src/models");



describe("Integration / Middlewares / Validation / userValidation", () => {

  describe("userValidation.createUser", () => {

    it("should return 400 if the username is already in use", async () => {

      const existingUserParams = { username: "kobe123", email: "a@c.com", password: "short" };
      const existingUser = await User.create(existingUserParams);

      const response = await request(app)
        .post("/auth/signup")
        .send(existingUserParams);

      expect(response.status).to.equal(400);
      expect(response.body.errors[0]).to.deep.include({ msg: "Username already in use", path: "username" });

    });


    it("should return 400 if email is invalid", async () => {

      const newUserParams = { username: "kobe123", email: "invalidemail", password: "abcd1234" };

      const response = await request(app)
        .post("/auth/signup")
        .send(newUserParams);

      expect(response.status).to.equal(400);
      expect(response.body.errors[0]).to.deep.include({ msg: "Invalid email", path: "email" });

    });


    it("should return 400 if the email is already in use", async () => {

      const existingUserParams = { username: "kobe123", email: "a@c.com", password: "short" };
      const existingUser = await User.create(existingUserParams);

      const response = await request(app)
        .post("/auth/signup")
        .send(existingUserParams);

      expect(response.status).to.equal(400);
      expect(response.body.errors[1]).to.deep.include({ msg: "Email already in use", path: "email" });

    });


    it("should return 400 if password is too short", async () => {

      const newUserParams = { username: "kobe123", email: "a@c.com", password: "short" };

      const response = await request(app)
        .post("/auth/signup")
        .send(newUserParams);

      expect(response.status).to.equal(400);
      expect(response.body.errors[0]).to.deep.include({ msg: "Password must be at least 8 characters", path: "password" });

    });

  });

});