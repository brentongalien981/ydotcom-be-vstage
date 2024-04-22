const db = require("../models");
const notificationService = require("../services/notificationService");
const videoService = require("../services/videoService");
const NotificationManagerSocketio = require("../utils/NotificationManagerSocketio");


const bbdevcomVideoController = {

  onVideoReady: async (req, res, next) => {

    try {
      const bbdevcomVideoHookType = req.body.type;

      if (bbdevcomVideoHookType === "video.asset.ready") {

        // Update video db record.
        const video = await videoService.handleOnVideoReady(req);

        // Create notification for post+video being ready.
        const post = await video.getPost();
        const notification = await notificationService.createNotificationForOnPostReady(post);

        // Notify the owner.       
        const owner = await post.getUser();
        NotificationManagerSocketio.notifyUser(owner, notification);

      }


      // Respond 200 to bbdevcomVideo hook-event-sender.
      res.status(200).json({
        msg: "Request OK for bbdevcomVideo-hook-event: onVideoReady()"
      });
    } catch (e) {
      return next(e);
    }

  }

};


module.exports = bbdevcomVideoController;