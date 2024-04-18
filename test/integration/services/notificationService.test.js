require("../../test-env-bootstrap");
const { expect } = require("chai");
const notificationService = require("../../../src/services/notificationService");
const db = require("../../../src/models");
const { POST_READY_NOTIFICATION_TYPE_ID } = require("../../../src/constants/notificationConstants");
const { generateUser } = require("../../../src/factories/userFactory");
const { generatePostForUserId } = require("../../../src/factories/postFactory");


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

});