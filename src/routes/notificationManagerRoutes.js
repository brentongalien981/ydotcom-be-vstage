const express = require("express");
const NotificationManagerSocketio = require("../utils/NotificationManagerSocketio");
const router = express.Router();



router.get("/showUsersToRoomsMap", (req, res) => {

  const map = NotificationManagerSocketio.getUsersToRoomsMap();

  res.json({
    msg: "Request OK for route: /notificationManager/showUsersToRoomsMap",
    map
  });
});



router.get("/testNotifyUser", (req, res) => {
  
  if (process.env.NODE_ENV !== "development") {
    return res.json({
      msg: "This is only allowed in development mode."
    });
  }

  const fakeUser = { username: "a" };
  const fakeNotification = { msg: "Fake notification." };
  NotificationManagerSocketio.notifyUser(fakeUser, fakeNotification);

  res.json({
    msg: "Request OK for route: /notificationManager/testNotifyUser"
  });

});


module.exports = router;