const { default: bbdevcomVideo } = require("@bbdevcomVideo/bbdevcomVideo-node");
const My = require("../utils/My");


const mybbdevcomVideoService = {

  getUploadData: async () => {

    const { video } = new bbdevcomVideo({
      tokenId: process.env.bbdevcomVideo_ACCESS_TOKEN_ID,
      tokenSecret: process.env.bbdevcomVideo_SECRET_KEY
    });

    const mybbdevcomVideoUploadPassthrough = My.generateUuid();

    // Create bbdevcomVideo Upload obj.
    const upload = await video.uploads.create({      
      cors_origin: '*',
      // Specify the settings used to create the new Asset after the upload is complete
      new_asset_settings: {
        passthrough: mybbdevcomVideoUploadPassthrough,
        playback_policy: 'public',
      }
    });


    return {
      upload,
      bbdevcomVideoUploadPassthrough: mybbdevcomVideoUploadPassthrough
    };

  },

  getVideoData: async (bbdevcomVideoAssetId) => {

    const { video } = new bbdevcomVideo({
      tokenId: process.env.bbdevcomVideo_ACCESS_TOKEN_ID,
      tokenSecret: process.env.bbdevcomVideo_SECRET_KEY
    });

    return await video.assets.retrieve(bbdevcomVideoAssetId);

  }

};


module.exports = mybbdevcomVideoService;