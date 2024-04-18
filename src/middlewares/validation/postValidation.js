const { body, validationResult } = require("express-validator");


const postValidation = {

  createPost: [

    // Validate username
    body("postMessage").trim().escape()
      .notEmpty().withMessage("Post message content is required")
      .isLength({ min: 1 }).withMessage("Post message content must be at least 1 character")
      .isLength({ max: 512 }).withMessage("Post message content must be at most 512 characters"),


    // Check for validation errors
    (req, res, next) => {
      const errors = validationResult(req);

      // On error
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      // On success
      next();
    }
  ]
};


module.exports = postValidation;