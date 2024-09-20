/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signup: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.badRequest("Email and password are required.");
    }
    try {
      await User.create({ email, password });
      return res.redirect("/user/signin");
    } catch (err) {
      return res.serverError(err);
    }
  },

  signin: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.badRequest("Email and password are required.");
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("User not found");
      }

      const bcrypt = require("bcrypt");
      bcrypt.compare(password, user.password, (err, valid) => {
        if (err || !valid) {
          return res.status(401).send("Invalid credentials");
        }

        req.session.userId = user.id;
        return res.redirect("/");
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  logout: function (req, res) {
    req.session.userId = null;
    return res.redirect("/");
  },
};
