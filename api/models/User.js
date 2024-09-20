/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },
  beforeCreate: function (values, proceed) {
    // Hash password before saving the user
    const bcrypt = require("bcrypt");
    bcrypt.hash(values.password, 10, (err, hash) => {
      if (err) return proceed(err);
      values.password = hash;
      return proceed();
    });
  },
};
