const { body, validationResult } = require("express-validator");
const { User } = require("../../models");


const userValidation = {

  createUser: [

    // Validate username
    body("username").trim().escape()
      .notEmpty().withMessage("Username is required")
      .isAlphanumeric().withMessage("Username must contain only numbers and letters")
      .isLength({ min: 4 }).withMessage("Username must be at least 4 characters")
      .isLength({ max: 16 }).withMessage("Username must be at most 16 characters")
      .custom(async (value) => {
        const user = await User.findOne({ where: { username: value } });

        if (user) {
          throw new Error("Username already in use");
        }
      }),

    // Validate email
    body("email").trim().escape()
      .isEmail().withMessage("Invalid email")
      .isLength({ max: 64 }).withMessage("Email must be at most 64 characters")
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });

        if (user) {
          throw new Error("Email already in use");
        }
      }),

    // Validate password
    body("password").trim().escape()
      .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
      .isLength({ max: 16 }).withMessage("Password must be at most 16 characters"),

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
  ],

  loginUser: [

    // Validate email
    body("email").trim().escape()
      .isEmail().withMessage("Invalid email")
      .isLength({ max: 64 }).withMessage("Email must be at most 64 characters"),

    // Validate password
    body("password").trim().escape()
      .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
      .isLength({ max: 16 }).withMessage("Password must be at most 16 characters"),

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


module.exports = userValidation;