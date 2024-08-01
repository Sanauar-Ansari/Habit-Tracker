const Habit = require("../models/habit");
// This function is to generate the todays date only at the first time.
// function getTodayDate() {
//   var today = new Date();
//   let date = today.getDate();
//   let month = today.getMonth() + 1;
//   let year = today.getFullYear();

//   let fullDate = date + "/" + month + "/" + year;
//   return fullDate;
// }
// *****************************************
function getOneWeekDate() {
  let dates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    let mm = currentDate.getMonth() + 1;
    // if (mm < 10) mm = "0" + mm;
    let dd = currentDate.getDate();
    // if (dd < 10) dd = "0" + dd;
    const yyyy = currentDate.getFullYear();
    dates.push(dd + "/" + mm + "/" + yyyy);
  }
  return dates;
}

// this function takes user to home
module.exports.home = async function (req, res) {
  const fetchingDataFromDB = await Habit.find();
  return res.render("home", {
    data: fetchingDataFromDB,
    weeklyDates: await getOneWeekDate(),
  });
};

module.exports.createHabit = async function (req, res) {
  try {
    Habit.create({
      title: req.body.habit_name,
      dates: {
        date: new Date().toLocaleString("en-IN").split(",")[0],
        complete: false,
      },
    });
    return res.redirect("/");
  } catch (err) {
    console.log("Error while creating habit" + err);
  }
};

module.exports.update = async function (req, res) {
  console.log("request received");
  console.log(req.query.date);
};

// To delete the habits
module.exports.deleteHabit = async function (req, res) {
  //get the id from ul list by query
  let id = req.query.id;
  //find the id inside database and delete it
  await Habit.findByIdAndDelete(id);
  return res.redirect("/");
};
