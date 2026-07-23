const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB");
  });
};

module.exports = connectToDB;

// MONGO_URL
