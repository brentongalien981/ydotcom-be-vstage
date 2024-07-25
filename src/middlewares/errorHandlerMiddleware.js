const DefaultInternalError = require("../errors/DefaultInternalError");
const My = require("../utils/My");

function errorHandlerMiddleware(err, req, res, next) {

  if (process.env.NODE_ENV === "development") {
    console.log("\n\n\n############################################");
    console.log("*** YdotCom General Error Handler ***");
    console.log("MyError: " + err.message);
    console.log("############################################");

    console.error(err.stack);
  }

  // Sending an appropriate HTTP status code and error message to the client
  const theError = err.status ? err : new DefaultInternalError();

  res.status(theError.status).json({
    error: theError
  });
}


module.exports = errorHandlerMiddleware;