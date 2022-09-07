const express = require("express");
const dashboardController = require("../controller/dashboard.controller");
const router = express.Router();

// const file = path.join(__dirname + "/../uploadFile")
// router.route('/').get().post().delete().patch().put() --> one path
// router.route('/user/save/form').get(dashboardController.dashboardUserSaveForm)

router.route("/").get(dashboardController.dashboardHome);
router.route("/user/save").post(dashboardController.dashboardUserSave);

module.exports = router;
