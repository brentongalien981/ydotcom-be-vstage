require("../../test-env-bootstrap");

const { expect } = require("chai");
const db = require("../../../src/models");
const My = require("../../../src/utils/My");


describe("Unit / Models / video", () => {

  describe("video.create", () => {

    it("should create a video", async () => {

      const u = await db.User.create({
        username: "a",
        email: "a@",
        password: "abc"
      });

      const p = await db.Post.create({
        userId: u.id,
        message: "the message"
      });

      const v = await db.Video.create({
        postId: p.id,
        bbdevcomVideoPassthrough: My.generateUuid()
      });


      const allVideos = await db.Video.findAll();
      const associatedPost = await allVideos[0].getPost();


      expect(allVideos.length).to.equal(1);
      expect(allVideos[0] instanceof db.Video).to.be.true;
      expect(allVideos[0].id).to.equal(v.id);
      expect(associatedPost.id).to.equal(p.id);

    });

  });

});