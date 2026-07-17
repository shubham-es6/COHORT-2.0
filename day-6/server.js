/* 
    -   server ko start karna
    -   database se connect karna
*/

require("dotenv").config();

const app = require("./src/app");
const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
};

connectToDb();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
