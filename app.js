require('dotenv').config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const BotController = require("./controller/bot");

//INITIALIZING BOT CLASS
const botController = new BotController();

const token = process.env.TOKEN;

const app = express();
const bot = new TelegramBot(token, {polling: true});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

bot.onText(/\/start/, async (msg) => {
    const chatid = msg.chat.id;
    await botController.getUserData(chatid);
    bot.sendMessage(chatid, "Welcome to Spark Bot Habbit Tracker. How can I help you?", { 
        reply_markup: {
            keyboard: [
                ["Add Habbit", "Track Habbit"],
                ["View Habbit", "Delete Habbit"]
            ]
        }
    });
});

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))