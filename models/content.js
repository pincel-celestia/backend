const mongoose = require("mongoose");

const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;
const MIN_PASSWORD_LENGTH = 6;

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  cid: {
    type: String,
    required: true,
    unique: true,
  },
  folder: {
    type: ObjectId,
    ref: "Folder",
    required: false,
  },
});
module.exports = mongoose.model("Content", ContentSchema);
