const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Profile } = require("../models");

const AuthenticationError = require("../errors/AuthenticationError");
const My = require("../utils/My");



const authService = {

  signup: async (req) => {

    // Generate bcryptjs salt with 10 rounds.
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({ username: req.body.username, email: req.body.email, password: hashedPassword });

    // Generate JWT token.
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return token;

  },


  login: async (req) => {

    let user = await User.findOne({ 
      where: { email: req.body.email }
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

      if (isPasswordValid) {
        // Generate JWT token.
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Add extra attribs to user.
        const userProfile = await user.getProfile();
        user = user.toJSON();
        user.profile = {
          photoSource: userProfile?.photoSource
        };

        return { user, token };
      }

    }

    throw new AuthenticationError();



  }

};


module.exports = authService;