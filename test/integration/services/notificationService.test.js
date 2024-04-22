require("../../test-env-bootstrap");
const { expect } = require("chai");
const notificationService = require("../../../src/services/notificationService");
const db = require("../../../src/models");
const { POST_READY_NOTIFICATION_TYPE_ID } = require("../../../src/constants/notificationConstants");
const { generateUser } = require("../../../src/factories/userFactory");
const { generatePostForUserId } = require("../../../src/factories/postFactory");
const { generateNotificationsForUser } = require("../../../src/factories/notificationFactory");


describe("Integration / Services / notificationService", () => {

  describe("notificationService.createNotificationForOnPostReady", () => {

    it("should create a notification with post-ready-notification-type", async () => {

      // Mock a user, post.
      const mockUser = await generateUser();
      const mockPost = await generatePostForUserId(mockUser.id);


      // Call the service
      const createdNotification = await notificationService.createNotificationForOnPostReady(mockPost);

      // Query for notifications
      const allNotifications = await db.Notification.findAll();
      const queriedNotification = allNotifications[0];


      // Expect
      expect(allNotifications.length).to.equal(1);
      expect(createdNotification.id).to.equal(queriedNotification.id);
      expect(queriedNotification.notificationTypeId).to.equal(POST_READY_NOTIFICATION_TYPE_ID);
      expect(queriedNotification.isRead).to.equal(0);

    });


  });


  describe("notificationService.queryNumOfUnreadNotifications", () => {

    it("should query the num of unread notifications for a user", async () => {

      // Mock stuffs.
      const mockUser1 = await generateUser();
      const mockUser2 = await generateUser();
      const mockNotificationsOfUser1 = await generateNotificationsForUser(mockUser1, 10);
      const mockNotificationsOfUser2 = await generateNotificationsForUser(mockUser2, 10);


      // Call the service.
      const numUnreadNotificationsOfUser1 = await notificationService.queryNumOfUnreadNotifications(mockUser1);


      // Query for notifications data.
      const allNotifications = await db.Notification.findAll();
      const allNotificationsOfUser1 = await db.Notification.findAll({
        where: {
          userId: mockUser1.id
        }
      });


      // Expect
      expect(numUnreadNotificationsOfUser1).to.equal(allNotificationsOfUser1.length);
      expect(mockNotificationsOfUser2.length).to.equal(10);
      expect(allNotifications.length).to.equal(mockNotificationsOfUser1.length + mockNotificationsOfUser2.length);

    });

  });


  describe("notificationService.readNotifications", () => {

    it("should read notifications", async () => {

      // Mock stuffs.
      const mockUser1 = await generateUser();
      const mockUser2 = await generateUser();
      const mockNotificationsOfUser1 = await generateNotificationsForUser(mockUser1, 10);
      const mockNotificationsOfUser2 = await generateNotificationsForUser(mockUser2, 10);


      // Call the service.
      const queriedNotificationsOfUser1 = await notificationService.readNotifications(mockUser1);


      // Query for other notifications data.
      const allNotifications = await db.Notification.findAll();      


      // Expect
      expect(queriedNotificationsOfUser1.length).to.equal(10);
      expect(allNotifications.length).to.equal(20);

    });

  });


});