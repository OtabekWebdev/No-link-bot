const joinGroup = async (bot, msg) => {
  await bot.sendMessage(
    msg.chat.id,
    `👋Salom [${msg.new_chat_member.first_name}](tg://user?id=${msg.new_chat_member.id}) bizning [${msg.chat.title}](https://t.me/${msg.chat.username}) guruhimizga xush kelibsiz🎉🎉🎉`,
    {
      parse_mode: "Markdown",
      reply_to_message_id: msg.message_id,
    }
  );
  await bot.deleteMessage(msg.chat.id, msg.message_id);
};

module.exports = {
  joinGroup,
};
