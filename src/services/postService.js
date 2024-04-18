const db = require("../models");
const My = require("../utils/My");
const mybbdevcomVideoService = require("./bbdevcomVideoService");

const postService = {

  readPosts: async (req) => {

    let numOldPosts = parseInt(req.query.numOldPosts);
    if (!numOldPosts) {
      numOldPosts = 0;
    }

    const posts = await db.Post.findAll({
      offset: numOldPosts,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        { model: db.User, as: "user", attributes: ["username"] },
        { model: db.Video, as: "video" }
      ]
    });


    const jsonPosts = [];

    // Dynamically add a bbdevcomVideoPlaybackId attrib to each post.video entry
    for (let i = 0; i < posts.length; i++) {

      const p = posts[i].toJSON();

      // Skip posts with no video.
      if (!p.video.bbdevcomVideoAssetId) { continue; }

      p.video.bbdevcomVideoPlaybackId = (await mybbdevcomVideoService.getVideoData(p.video.bbdevcomVideoAssetId)).playback_ids[0].id;
      jsonPosts.push(p);

    }

    return jsonPosts;

  }

};


module.exports = postService;