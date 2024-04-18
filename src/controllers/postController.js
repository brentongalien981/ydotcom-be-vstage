const he = require("he");
const { Post, Video } = require("../models");
const mybbdevcomVideoService = require("../services/bbdevcomVideoService");
const postService = require("../services/postService");


const postController = {
  createPost: async (req, res, next) => {    

    try {
      const bbdevcomVideoUploadData = await mybbdevcomVideoService.getUploadData();

      // Create Post
      const post = await Post.create({
        userId: req.authUser.id,
        message: he.decode(req.body.postMessage)
      });
      
      // Create video data   
      const video = await Video.create({
        postId: post.id,
        bbdevcomVideoPassthrough: bbdevcomVideoUploadData.bbdevcomVideoUploadPassthrough
      });

      // Response
      res.status(201).json({
        msg: "Request OK for POST route: /posts",
        uploadUrl: bbdevcomVideoUploadData.upload.url

      });

    } catch (e) {
      return next(e);
    }

  },

  readPosts: async (req, res, next) => {
    
    try {
            
      const posts = await postService.readPosts(req);

      res.status(200).json({
        msg: "Request OK for GET route: /posts",
        posts: posts
      });
    } catch (e) {
      return next(e);
    }

  }
};


module.exports = postController;