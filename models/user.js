const mongoose = require("mongoose");

const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;
const MIN_PASSWORD_LENGTH = 6;

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH,
  },
  password: {
    type: String,
    trim: true,
    required: false,
    minlength: MIN_PASSWORD_LENGTH,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH,
  },
  name_surname: {
    type: String,
    default: null,
    minlength: 1,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH,
  },
});

module.exports = mongoose.model("User", UserSchema);
