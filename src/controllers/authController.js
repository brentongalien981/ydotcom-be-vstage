const { generateUserAttribsWithoutId } = require("../factories/userFactory");
const { User } = require("../models");
const authService = require("../services/authService");
const My = require("../utils/My");
const { v4: uuidv4 } = require("uuid");

const authController = {

  randomCreateUser: async (req, res) => {

    const randomUserAttribs = await generateUserAttribsWithoutId();
    const u = await User.create(randomUserAttribs);

    res.status(200).json({
      msg: "Request OK for route /auth/randomCreateUser",
      theMethod: "GET",
      u: u
    });

  },

  getUsers: async (req, res, next) => {

    const u = await User.findOne();

    res.status(200).json({
      msg: "Request OK for route /auth/getUser",
      theMethod: "GET",
      u: u
    });

  },

  signup: async (req, res, next) => {

    try {

      const token = await authService.signup(req);

      res.status(201).json({
        msg: "Request OK for route /auth/signup",
        theMethod: "POST",
        token: token,
        username: req.body.username
      });

    } catch (e) {
      return next(e);
    }

  },


  login: async (req, res, next) => {

    try {

      const loginData = await authService.login(req);

      res.status(200).json({
        msg: "Request OK for route /auth/login",
        theMethod: "POST",
        token: loginData.token,
        username: loginData.user.username,
        profilePhotoSource: loginData.user.profile.photoSource
      });

    } catch (e) {

      // Handle authentication error.
      if (e.status != 500) {
        res.status(e.status).json({
          error: e
        });
      }

      // Handle other server error.
      return next(e);
    }

  }

};


module.exports = authController;