const mongoose = require("mongoose");

const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;
const MIN_PASSWORD_LENGTH = 6;

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  topFolder: {
    type: ObjectId,
    ref: "Folder",
    required: false,
  },
});
module.exports = mongoose.model("Folder", folderSchema);
