require("../../test-env-bootstrap");
const authMiddleware = require("../../../src/middlewares/authMiddleware");
const chai = require("chai");
const spies = require("chai-spies");
const { User } = require("../../../src/models");
const jwt = require("jsonwebtoken");


chai.use(spies);

const expect = chai.expect;


describe("Integration / Middlewares / authMiddleware", () => {

  describe("authMiddleware.authenticate", () => {

    it("should set req.isLoggedIn to false if no token is provided", async () => {

      // Mock stuffs
      const req = {};
      const res = {};
      const next = () => { };

      // Spy
      const spyNext = chai.spy(next);

      await authMiddleware.authenticate(req, res, spyNext);

      expect(req.isLoggedIn).to.be.false;
      expect(spyNext).to.have.been.called.once;


    });


    it("should set req.isLoggedIn to true if valid token is provided", async () => {

      // Create a user.
      const user = await User.create({ username: "aUsername", email: "anEmail", password: "aPassword" });
      
      // Generate JWT token.
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });


      // Mock stuffs
      const req = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
      const res = {};
      const next = () => { };


      // Spy
      const spyNext = chai.spy(next);


      // Act
      await authMiddleware.authenticate(req, res, spyNext);


      // Assert
      expect(req.isLoggedIn).to.be.true;
      expect(spyNext).to.have.been.called.once;
      expect(req.authUser.id).to.equal(user.id);

    });

  });

});