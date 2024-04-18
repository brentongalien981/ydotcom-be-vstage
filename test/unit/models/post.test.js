const { expect } = require("chai");
const { Post, User } = require("../../../src/models");

require("../../test-env-bootstrap");


describe("Unit / Models / post", () => {

  describe("Post.create", () => {

    it("should create a post", async () => {

      const u = await User.create({
        username: "a",
        email: "a@",
        password: "abc"
      });


      const post = await Post.create({
        userId: u.id,
        message: "the message"
      });


      const foundPost = await Post.findOne();
      const allPosts = await Post.findAll();


      expect(foundPost.id).to.equal(post.id);
      expect(foundPost.userId).to.equal(u.id);
      expect(foundPost instanceof Post).to.be.true;
      expect(allPosts.length).to.equal(1);

    });

  });

});