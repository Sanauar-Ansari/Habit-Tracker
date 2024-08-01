const express = require("express");
//NO need to install like npm
const router = express.Router();
const homeController = require("../controller/home_controller");

router.get("/", homeController.home);
router.post("/createHabit", homeController.createHabit);
router.get("/delete-habit", homeController.deleteHabit);
// router.get("/update/:date", homeController.update);

//becoz we exported from here so we need to tell main index.js to use it.
module.exports = router;
