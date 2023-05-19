var Joi = require("joi");

var Loginvalidate = function(data) {
  var schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = Loginvalidate;
