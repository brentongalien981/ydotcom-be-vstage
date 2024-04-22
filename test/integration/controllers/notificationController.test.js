const request = require("supertest");
const app = require("../../../app");
require("../../test-env-bootstrap");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const sinon = require("sinon");
const { generateUser } = require("../../../src/factories/userFactory");
const chaiHttp = require("chai-http");
const notificationService = require("../../../src/services/notificationService");
const notificationController = require("../../../src/controllers/notificationController");

const expect = chai.expect;
chai.use(chaiHttp);



describe("Integration / Controllers / notificationController", () => {

  describe("notificationController.readNotifications", () => {

    it("should return 200 for successful read of notifications", async () => {

      // Mock stuffs
      // Create a user.
      const fakeUser = await generateUser();

      // Generate JWT token.
      const token = jwt.sign({ id: fakeUser.id, email: fakeUser.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      const authHeader = `Bearer ${token}`;


      // Act
      const response = await request(app)
        .get("/notifications")
        .set("Authorization", authHeader)
        .send();


      // Assert
      expect(response.status).to.equal(200);

    });


    it("should call notificationService.readNotifications once", async () => {

      const readNotificationsStub = sinon.stub(notificationService, "readNotifications");

      const mockReq = {};
      const mockRes = {};
      const mockNext = () => {};

      await notificationController.readNotifications(mockReq, mockRes, mockNext);

      expect(readNotificationsStub.calledOnce).to.be.true;

      // Restore the stub after the test.
      readNotificationsStub.restore();

    });


  });

});