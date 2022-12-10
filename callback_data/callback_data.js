const { messageUser } = require("../Controller/message/Usermessage");
const User = require("../model/Usermodel");
const callback_edit = (bot, msg) => {
  // console.log(msg);
  User.findOneAndUpdate(
    { id: msg.message.chat.id },
    { language: msg.data },
    (err, data) => {
      //   console.log(data);
      if (err) {
        console.log("Change Language Error");
      } else {
        User.find({ id: msg.message.chat.id }, (err, data) => {
          if (err) {
            console.log("Change Language Error 2");
          } else {
            messageUser(
              bot,
              msg.message,
              data[0].member,
              data[0].step,
              data[0].language,
              true
            );
          }
        });
      }
    }
  );
  bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
};

module.exports = {
  callback_edit,
};
