const notificationService = require("../services/notificationService");


const notificationController = {

  queryNumOfUnreadNotifications: async (req, res) => {
    const numUnreadNotificationsForUser = await notificationService.queryNumOfUnreadNotifications(req.authUser);

    res.json({
      msg: "Request OK for POST route: notifications / queryNumOfUnreadNotifications",
      numUnreadNotifications: numUnreadNotificationsForUser
    });
  }

};


module.exports = notificationController;