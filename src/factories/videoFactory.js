const { faker } = require("@faker-js/faker");
const My = require("../utils/My");
const { getDumbRandombbdevcomVideoVideoId } = require("../data/dumbVideoData");
const db = require("../models");

function generateVideoAttribs(posts) {
  const videoAttribs = [];

  for (let i = 0; i < posts.length; i++) {

    const attrib = {
      postId: posts[i].id,
      bbdevcomVideoPassthrough: My.generateUuid(),
      bbdevcomVideoAssetId: getDumbRandombbdevcomVideoVideoId()
    };

    videoAttribs.push(attrib);

  }

  return videoAttribs;
}


function generateVideoAttribsForPostId(postId, includeMaxAssetId = false) {

  return {
    postId: postId,
    bbdevcomVideoPassthrough: My.generateUuid(),
    bbdevcomVideoAssetId: includeMaxAssetId ? getDumbRandombbdevcomVideoVideoId() : null
  };
}


async function generateVideoForPostId(postId) {
  const videoAttribs = generateVideoAttribsForPostId(postId);
  const video = await db.Video.create(videoAttribs);
  return video;
}


module.exports = {
  generateVideoAttribs,
  generateVideoForPostId
};