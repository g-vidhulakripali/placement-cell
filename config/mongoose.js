const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/placement_cell_db");
const db = mongoose.connection;
db.on("error", console.log.bind(console, "Error connecting to MongoDB"));
db.once("open", function () {
  console.log("Connected to Database:: MongoDB");
});

module.exports = db;
