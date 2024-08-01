const express = require("express");
const db = require("./config/mongoose");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const Habit = require("./models/habit");
const { ObjectId } = require("mongodb");

//Setting up views
app.set("view engine", "ejs");
app.set("views", "./views");

//adding static files
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded());
app.use(bodyParser.json());

// use express router
app.post("/update", async (req, res) => {
  try {
    console.log("request received");
    console.log(req.body.date);
    console.log(req.body.id);

    let d = req.body.date;
    let id = req.body.id;

    const mongoData = await Habit.findOne({ _id: new ObjectId(id) });

    if (!mongoData) {
      return res.status(404).send("Document not found");
    }
    console.log(mongoData);
    let idx = mongoData.dates.findIndex((input) => input.date == d);
    if (idx === -1) {
      mongoData.dates.push({ date: d, complete: false });
    }
    mongoData.dates.map((task) => {
      if (task.date === d) {
        task["complete"] = !task["complete"];
      }
    });
    console.log("Document updated:", mongoData);
    await Habit.updateOne(
      { _id: new ObjectId(id) },
      { $set: { dates: mongoData.dates } }
    );

    return res.status(200).json(mongoData.dates);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).send("Internal server error");
  }
});
app.use("/", require("./routes/habit"));
//Listening the port
app.listen(5000, (req, res) => {
  console.log("Succsessfully runing on port no:" + 5000);
});
