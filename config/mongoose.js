const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sanauaransari99:QC9HU2UlbPoo8zvk@cluster0.7ozhvfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error while connecting."));

db.once("open", function () {
  console.log("successfully connected to the db");
});
