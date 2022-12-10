const { Schema, model } = require("mongoose");

module.exports = model(
  "Users",
  Schema({
    id: {
      type: Number,
    },
    first_name: {
      type: String,
    },
    username: {
      type: String,
    },
    step: {
      type: String,
    },
    language: {
      type: String,
    },
    member: {
      type: String,
    },
  })
);
