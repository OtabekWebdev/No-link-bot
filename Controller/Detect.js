// ============== User ==============
const Users = require("../model/Usermodel");
// ============== User ==============
// ============== Group ============
const Groups = require("../model/Groupmodel");
const { messageGroup } = require("./message/Groupmessage");
const { messageUser } = require("./message/Usermessage");
// ============== Group ============
const messsage = (bot, msg) => {
  // console.log(msg);
  if (msg.chat.type == "private") {
    Users.find({ id: msg.chat.id }, (err, data) => {
      if (data[0]) {
        messageUser(bot, msg, data[0].member, data[0].step, false);
      } else if (err) {
        console.log("User find Error /controller/message.js");
      } else {
        Users({
          id: msg.from.id,
          first_name: msg.from.first_name,
          username: msg.from.username ? msg.from.username : "no",
          step: "0",
          language: "uz",
          member: "user",
        }).save();
        messageUser(bot, msg, "user", 0, "uz", false);
      }
    });
  } else if (msg.chat.type == "supergroup") {
    Groups.find({ id: msg.chat.id }, async (err, data) => {
      if (data[0]) {
        await messageGroup(bot, msg);
      } else if (err) {
        console.log(err);
      } else {
        Groups({
          id: msg.chat.id,
          title: msg.chat.title,
          username: msg.chat.username,
          member_count: 0,
        }).save();
        await messageGroup(bot, msg);
      }
    });
  }
};

module.exports = {
  messsage,
};
