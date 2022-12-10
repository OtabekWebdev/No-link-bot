require("dotenv/config");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TOKEN, {
  polling: true,
});
// ======== Webhook ============
// var http = require("http");
// setInterval(function () {
//   http.get("http://itcpax.herokuapp.com");
// }, 300000);
// const url = "https://nolink02.herokuapp.com:443";
// const bot = new TelegramBot(process.env.TOKEN, {
//   webHook: {
//     port: process.env.PORT,
//   },
// });
// bot.setWebHook(`https://nolink02.herokuapp.com:443/bot${process.env.TOKEN}`);
// ======== Webhook ============
const mongoose = require("mongoose");
mongoose.connect(process.env.M_DB, (err) => {
  if (err) {
    console.log("Mongoose Error❌❌❌");
  } else {
    console.log("Mongoose connect✅✅✅");
  }
});
bot.on("message", (msg) => {
  require("./Controller/Detect").messsage(bot, msg);
});
bot.on("callback_query", (msg) => {
  require("./callback_data/callback_data").callback_edit(bot, msg);
});
bot.on("new_chat_members", (msg) => {
  require("./Controller/message/joingroup").joinGroup(bot, msg);
});
