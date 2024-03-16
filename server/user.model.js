const { Schema, model: _model } = require("mongoose");



const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "user-data" }
);

const model = _model("UserData", User);

module.exports = model;
