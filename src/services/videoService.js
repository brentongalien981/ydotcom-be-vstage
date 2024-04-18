const db = require("../models");

const videoService = {

  handleOnVideoReady: async (req) => {
    // Update video db record with the following.
    const bbdevcomVideoAssetId = req.body.data.id;
    const bbdevcomVideoPassThroughId = req.body.data.passthrough;

    const video = await db.Video.findOne({ where: { bbdevcomVideoPassthrough: bbdevcomVideoPassThroughId } });
    await video.update({ bbdevcomVideoAssetId: bbdevcomVideoAssetId });

    return video;
  }

};


module.exports = videoService;