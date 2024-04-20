const My = require("../utils/My");

const POST_READY_NOTIFICATION_TYPE_ID = 1;
const FOLLOW_REQUEST_NOTIFICATION_TYPE_ID = 2;
const FOLLOW_ACCEPT_NOTIFICATION_TYPE_ID = 3;


function getRandomNotificationTypeId() {
  const randomNumber = My.getRandomNumber(1, 3);
  return randomNumber;
}


module.exports = {
  POST_READY_NOTIFICATION_TYPE_ID,
  FOLLOW_REQUEST_NOTIFICATION_TYPE_ID,
  FOLLOW_ACCEPT_NOTIFICATION_TYPE_ID, 
  getRandomNotificationTypeId 
};