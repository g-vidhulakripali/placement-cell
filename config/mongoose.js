const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://gvidhulakripali:Oey4aY6N1BI9N57K@cluster0.squt5dz.mongodb.net/placement-cell-db"
);
const db = mongoose.connection;
db.on("error", console.log.bind(console, "Error connecting to MongoDB"));
db.once("open", function () {
  console.log("Connected to Database:: MongoDB");
});

module.exports = db;
