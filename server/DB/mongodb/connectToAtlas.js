const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const userName = config.get("DB_NAME");
const password = config.get("DB_PASSWORD");

mongoose
  .connect(
    `mongodb+srv://${userName}:${password}@cluster0.kvxgpt1.mongodb.net/test`
  )
  .then(() => console.log(chalk.magentaBright("connected to MongoDB Atlas!")))
  .catch((error) =>
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
  );
