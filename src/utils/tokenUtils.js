const jwt = require("jsonwebtoken");
const { User } = require("../models");


async function validateToken(token) {

  let returnValue = {
    isTokenValid: false,
    authUser: null
  };

  if (!token) { return returnValue; }


  try {

    // Verify and decode the token        
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;
    const expiration = decoded.exp;

    // Check the token's expiration.
    if (expiration) {

      // Get the current timestamp in seconds
      const currentTimestamp = Math.floor(Date.now() / 1000);

      // Check if the expiration time is in the past
      const isExpired = expiration < currentTimestamp;

      if (!isExpired) {

        // Check if userId is valid.
        const user = await User.findByPk(userId);

        if (user) {
          returnValue.isTokenValid = true;
          returnValue.authUser = user;
        }

      }
    }

  } catch (e) {
    console.log("YdotCom-Error: Error validating token.");
    console.log(e.message);
  }

  return returnValue;
}


module.exports = {
  validateToken
};