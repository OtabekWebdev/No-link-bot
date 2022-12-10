const messageGroup = async (bot, msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const mId = msg.message_id;
  const text = msg.text;
  const url = msg.entities ? msg.entities[0].type : "no_entities";
  // console.log(msg);
  bot.getChatMember(chatId, userId).then(async (data) => {
    if (
      ((data.status != "creator" && data.status != "administrator") ||
        msg.chat.is_bot) &&
      (url == "url" || url == "mention")
    ) {
      await bot.sendMessage(
        chatId,
        `[${msg.from.first_name}](tg://user?id=${userId}) *Iltimos reklama tarqatmang*`,
        {
          parse_mode: "Markdown",
          reply_to_message_id: mId,
        }
      );
      await bot.deleteMessage(chatId, mId);
    }
  });
};

module.exports = {
  messageGroup,
};
// [${User}](tg://user?id=${msg.from.id})
