const { Schema, model } = require("mongoose");

module.exports = model(
  "Group",
  Schema({
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    username: {
      type: String,
    },
    members_count:{
      type : Number 
    }
  })
);