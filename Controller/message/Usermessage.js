const User = require("../../model/Usermodel");
const Group = require("../../model/Groupmodel");
const Text = require("../../model/Textsmodel");
const { step } = require("./step");
const messageUser = (bot, msg, member, user_step, language, data) => {
  const m = member;
  const s = user_step;
  const d = data;
  const l = language;
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text == "/start") {
    if (m == "admin") {
      bot.sendMessage(chatId, "Salom Administrator botga xush kelibsiz", {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [["📊Ma'lumot", "⚙️Sozlash"]],
        },
      });
      step(chatId, 0);
    } else {
      bot.sendMessage(
        chatId,
        "Tilni tanlang | Select a language | Выберите язык",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🇺🇿 O'zbek",
                  callback_data: "uz",
                },
                {
                  text: "🇬🇧 English",
                  callback_data: "en",
                },
                {
                  text: "🇷🇺 Русский",
                  callback_data: "ru",
                },
              ],
            ],
          },
        }
      );
    }
    // step(0);
  } else if (d) {
    Text.find({ id: 1 }, (err, text) => {
      if (err) {
        console.log("Text error");
      } else {
        const lan = (Tdata) => {
          return Tdata.language == l;
        };
        // console.log(text.filter(lan));
        text = text.filter(lan)[0].text;
        if (l == "uz") {
          bot.sendMessage(chatId, text, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "➕Botni gruppaga qo'shish",
                    url: "https://t.me/my_test02bot?startgroup=uz",
                  },
                ],
              ],
            },
          });
        } else if (l == "ru") {
          bot.sendMessage(chatId, text, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "➕Добавить бота в группу",
                    url: "https://t.me/my_test02bot?startgroup=uz",
                  },
                ],
              ],
            },
          });
        } else {
          bot.sendMessage(chatId, text, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "➕Add a bot to a group",
                    url: "https://t.me/my_test02bot?startgroup=uz",
                  },
                ],
              ],
            },
          });
        }
      }
    });
  } else {
    if (m == "admin") {
      if (text == "📊Ma'lumot") {
        User.countDocuments({}, (err, Ucount) => {
          if (err) {
            console.log("User count err");
          } else {
            Group.countDocuments({}, (err, Gcount) => {
              if (err) {
                console.log("Group err");
              } else {
                bot.sendMessage(
                  chatId,
                  `*👤foydalanuvchilari soni*: ${Ucount}ta\n\n*👥Gruppalar soni*: ${Gcount}ta`,
                  {
                    parse_mode: "Markdown",
                  }
                );
              }
            });
          }
        });
      } else if (text == "⚙️Sozlash") {
        step(chatId, 2);
        bot.sendMessage(chatId, "Sozlamalarga xush kelibsiz", {
          reply_markup: {
            resize_keyboard: true,
            keyboard: [["⚙️setLanguages text"], ["⬅️ Orqaga"]],
          },
        });
      } else {
        if (text == "⬅️ Orqaga") {
          if (s == 2 || s == "setlang") {
            bot.sendMessage(chatId, "Asosiy Menyu", {
              reply_markup: {
                resize_keyboard: true,
                keyboard: [["📊Ma'lumot", "⚙️Sozlash"]],
              },
            });
            step(chatId, 0);
          } else if (s.split(" ")[0] == "setlang") {
            step(chatId, "setlang");
            bot.sendMessage(chatId, "❌Bekor qilindi.", {
              reply_markup: {
                resize_keyboard: true,
                keyboard: [
                  ["🇺🇿 O'zbek", "🇬🇧 English", "🇷🇺 Русский"],
                  ["⬅️ Orqaga"],
                ],
              },
            });
          }
        } else if (s == 2) {
          step(chatId, "setlang");
          bot.sendMessage(chatId, "sozlash uchun tilni tanlang", {
            reply_markup: {
              resize_keyboard: true,
              keyboard: [
                ["🇺🇿 O'zbek", "🇬🇧 English", "🇷🇺 Русский"],
                ["⬅️ Orqaga"],
              ],
            },
          });
        } else if (s == "setlang") {
          let option = {
            reply_markup: {
              resize_keyboard: true,
              keyboard: [["⬅️ Orqaga"]],
            },
          };
          if (text == "🇺🇿 O'zbek") {
            step(chatId, "setlang uz");
            bot.sendMessage(
              chatId,
              "🇺🇿 O'zbek tilini sozlash uchun matn yuboring",
              option
            );
          } else if (text == "🇬🇧 English") {
            step(chatId, "setlang en");
            bot.sendMessage(
              chatId,
              "🇬🇧 English tilini sozlash uchun matn yuboring",
              option
            );
          } else if (text == "🇷🇺 Русский") {
            step(chatId, "setlang ru");
            bot.sendMessage(
              chatId,
              "🇷🇺 Русский tilini sozlash uchun matn yuboring",
              option
            );
          }
        } else if (s.split(" ")[0] == "setlang") {
          if (s.split(" ")[1] == "uz") {
            Text.findOneAndUpdate({id : 1,language : 'uz'},{text },(err)=>{
              if (err) {
                console.log('Change uzb language');
              }
            })
            bot.sendMessage(chatId, "🇺🇿 O'zbek tili o'zgartirildi✅");
          }
          if (s.split(" ")[1] == "en") {
            Text.findOneAndUpdate({id : 1,language : 'en'},{text },(err)=>{
              if (err) {
                console.log('Change eng language error');
              }
            })
            bot.sendMessage(chatId, "🇬🇧 English tili o'zgartirildi✅");
          }
          if (s.split(" ")[1] == "ru") {
            Text.findOneAndUpdate({id : 1,language : 'ru'},{text },(err)=>{
              if (err) {
                console.log('Change ru language error');
              }
            })
            bot.sendMessage(chatId, "🇷🇺 Русский tili o'zgartirildi✅");
          }
        }
      }
    }
  }
};

module.exports = {
  messageUser,
};
