const { POST_READY_NOTIFICATION_TYPE_ID } = require("../constants/notificationConstants");
const db = require("../models");

const notificationService = {

  createNotificationForOnPostReady: async (post) => {

    // Reference the post owner.
    const owner = await post.getUser();


    // Create notification for the video's owner.
    const postMsgSubstring = "\"" + post.message.substring(0, 16) + "...\"";
    const notificationMsg = `Your post ${postMsgSubstring} is now ready.`;

    const notification = await db.Notification.create({
      userId: owner.id,
      message: notificationMsg,
      notificationTypeId: POST_READY_NOTIFICATION_TYPE_ID
    });
    
    return notification;

  },


  queryNumOfUnreadNotifications: async (user) => {

    const unreadNotificationsForUser = await db.Notification.findAll({
      where: {
        userId: user.id,
        isRead: 0
      }
    });

    return unreadNotificationsForUser.length;

  },


  readNotifications: async (user) => {

    return await user.getNotifications({
      order: [["createdAt", "DESC"]]
    });

  }

};


module.exports = notificationService;