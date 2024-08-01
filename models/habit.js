const mongoose = require("mongoose");

// create a habit schema
const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    dates: [
      {
        date: String,
        complete: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
