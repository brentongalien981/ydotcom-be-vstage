class BadRequestError extends Error {

  constructor(message = "Bad Request Error", status = 400) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 500;

    this.friendlyErrorMessage = "Oops, bad request.";    

    Error.captureStackTrace(this, this.constructor);
  }

}


module.exports = BadRequestError;