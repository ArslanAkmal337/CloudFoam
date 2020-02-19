const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  name: String,
  email: { type: String, minlength: 5, maxlength: 255 },
  password: { type: String, minlength: 5, maxlength: 1024 },
  balance: { type: Number, default: 0 },
  accepted: { type: Boolean, default: false }
});

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email(),
    password: Joi.string()
      .min(8)
      .max(255)
  };
  return Joi.validate(user, schema);
}

exports.User = mongoose.model("users", userSchema);
exports.validate = validateUser;
