require("../../test-env-bootstrap");
const { expect } = require("chai");
const db = require("../../../src/models");
const My = require("../../../src/utils/My");
const { generatePostAttribs } = require("../../../src/factories/postFactory");
const { generateVideoAttribs } = require("../../../src/factories/videoFactory");
const postService = require("../../../src/services/postService");
const { generateProfileForUser } = require("../../../src/factories/profileFactory");


describe("Integration / Services / postService", () => {

  describe("postService.readPosts", () => {

    it("should return posts data including their related user and video", async () => {

      // Create 10 fake posts.
      const fakePostsAttribs = await generatePostAttribs(10);
      const fakePosts = await db.Post.bulkCreate(fakePostsAttribs);

      // Generate fake profile for the created 10 users.
      const allUsers = await db.User.findAll();
      for (const u of allUsers) {
        await generateProfileForUser(u);
      }

      // Create 10 fake videos with 1 to 1 relationship with the fake videos.
      const fakeVideosAttribs = generateVideoAttribs(fakePosts);
      const fakeVideos = await db.Video.bulkCreate(fakeVideosAttribs);


      // Read all posts and videos.
      const fakeReq = {
        query: { numOldPosts: 0 }
      };
      const posts = await postService.readPosts(fakeReq);

      // Expect db to have 10 total posts and 10 total videos.
      expect(posts.length).to.equal(10)


      // Expect each post to have a video and a corresponding bbdevcomVideo-video-playback-id.
      for (let i = 0; i < posts.length; i++) {
        const p = posts[i];

        const videosForThePost = await db.Video.findAll({
          where: {
            postId: p.id
          }
        });

        expect(videosForThePost.length).to.equal(1);
        expect(p.user.username).not.to.be.undefined;
        expect(p.video.id).to.equal(videosForThePost[0].id);
        expect(p.video.bbdevcomVideoAssetId).not.to.be.undefined;
        expect(p.video.bbdevcomVideoPlaybackId).not.to.be.undefined;        

        expect(p.userProfile.photoSource).not.to.be.undefined;
      }

    });


  });

});