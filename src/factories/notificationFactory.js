const { faker } = require("@faker-js/faker/locale/af_ZA");
const { getRandomNotificationTypeId } = require("../constants/notificationConstants");
const db = require("../models");


async function generateNotificationsForUser(user, numOfNotifications = 1) {

  const notificationsAttribs = [];

  for (let i = 0; i < numOfNotifications; i++) {

    notificationsAttribs.push({
      userId: user.id,
      message: faker.lorem.paragraph(),
      notificationTypeId: getRandomNotificationTypeId()
    });

  }

  const fakeNotifications = await db.Notification.bulkCreate(notificationsAttribs);
  return fakeNotifications;

}


module.exports = {
  generateNotificationsForUser
};