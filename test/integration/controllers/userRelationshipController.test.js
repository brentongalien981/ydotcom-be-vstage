require("../../test-env-bootstrap");
const { expect } = require("chai");
const sinon = require("sinon");
const { generateUser } = require("../../../src/factories/userFactory");
const userRelationshipController = require("../../../src/controllers/userRelationshipController");



describe("Integration / Controllers / userRelationshipController", () => {

  describe("userRelationshipController.follow", () => {

    it("should call next with an error if there is an error following a user", async () => {

      // Generate an authenticated user.
      const user = await generateUser();


      // Mock stuffs
      const mockReq = {
        authUser: user,
        body: { userIdToFollow: "non-existent-user-id" }
      };
      const mockRes = {};
      const mockNext = sinon.stub(); 


      // Act: Call the controller's method.
      await userRelationshipController.follow(mockReq, mockRes, mockNext);


      // Assert
      expect(mockNext.calledOnce).to.be.true;
      expect(mockNext.firstCall.args[0]).to.be.an("error");
      expect(mockNext.firstCall.args[0].message).to.equal("User to follow not found.");

    });


    it("should return a JSON response with a property: isResultOk if user is successfully followed", async () => {
        
        // Generate an authenticated user.
        const user = await generateUser();
  
        // Generate a user to follow.
        const userToFollow = await generateUser();

        // Mock stuffs
        const mockReq = {
          authUser: user,
          body: { userIdToFollow: userToFollow.id }
        };

        const mockRes = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub()
        };

        const mockNext = () => {};

        // Act: Call the controller's method.
        await userRelationshipController.follow(mockReq, mockRes, mockNext);

        // Assert
        expect(mockRes.json.calledOnce).to.be.true;
        expect(mockRes.json.firstCall.args[0]).to.be.an("object");
        expect(mockRes.json.firstCall.args[0].isResultOk).to.be.true;
        
    });


  });

});