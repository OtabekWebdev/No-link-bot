const { Schema, model } = require("mongoose");

module.exports = model(
  "Text",
  Schema({
    id: {
      type: Number,
    },
    text: {
      type: String,
    },
    language: {
      type: String,
    },
  })
);
