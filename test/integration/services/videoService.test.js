require("../../test-env-bootstrap");
const { expect } = require("chai");
const db = require("../../../src/models");
const { generateUser } = require("../../../src/factories/userFactory");
const { generatePostForUserId } = require("../../../src/factories/postFactory");
const { generateVideoForPostId } = require("../../../src/factories/videoFactory");
const videoService = require("../../../src/services/videoService");


describe("Integration / Services / videoService", () => {

  describe("videoService.handleOnVideoReady", () => {

    it("should update video with bbdevcomVideoAssetId", async () => {

      // Mock a user, post, and video.
      const mockUser = await generateUser();
      const mockPost = await generatePostForUserId(mockUser.id);
      const mockVideo = await generateVideoForPostId(mockPost.id);

      // Initially, expect video's bbdevcomVideoAssetId property to be null.
      expect(mockVideo.bbdevcomVideoAssetId).to.be.null;

      // Mock request
      const mockReq = {
        body: {
          data: {
            id: "my-random-asset-id",
            passthrough: mockVideo.bbdevcomVideoPassthrough
          }
        }
      };

      // Call the service
      const updatedVideo = await videoService.handleOnVideoReady(mockReq);

      // Query the video using bbdevcomVideo-req's passthrough.
      const queriedVideo = await db.Video.findOne({ where: { bbdevcomVideoPassthrough: mockReq.body.data.passthrough } });
      const videoPost = await queriedVideo.getPost();
      const postOwner = await videoPost.getUser();

      
      // Expect
      expect(queriedVideo.id).to.equal(updatedVideo.id);
      expect(queriedVideo.bbdevcomVideoAssetId).to.equal(mockReq.body.data.id);
      expect(videoPost.id).to.equal(mockPost.id);
      expect(postOwner.id).to.equal(mockUser.id);

    });


  });

});