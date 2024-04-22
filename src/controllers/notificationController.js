const notificationService = require("../services/notificationService");
const My = require("../utils/My");


const notificationController = {

  queryNumOfUnreadNotifications: async (req, res) => {
    const numUnreadNotificationsForUser = await notificationService.queryNumOfUnreadNotifications(req.authUser);

    res.json({
      msg: "Request OK for POST route: notifications / queryNumOfUnreadNotifications",
      numUnreadNotifications: numUnreadNotificationsForUser
    });
  },

  readNotifications: async (req, res, next) => {
    // TODO: Delete
    await My.sleep();
    
    try {

      const user = req.authUser;
      const notifications = await notificationService.readNotifications(user);

      res.json({
        msg: "Request OK for GET route: /notifications",
        notifications: notifications
      });
    } catch (e) {
      return next(e);
    }
  } 

};


module.exports = notificationController;