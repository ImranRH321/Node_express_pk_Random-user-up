const express = require("express");
const dashboardController = require("../controller/dashboard.controller");
const router = express.Router();

// const file = path.join(__dirname + "/../uploadFile")
// router.route('/').get().post().delete().patch().put() --> one path
// router.route('/user/save/form').get(dashboardController.dashboardUserSaveForm)

router.route("/").get(dashboardController.dashboardHome);
router.route("/user/all").get(dashboardController.dashboardUserAll);
router.route("/user/save").post(dashboardController.dashboardUserSave);
router.route("/user/update/:id").patch(dashboardController.dashboardUserUpdate);
router.route("/user/bulk-update").patch(dashboardController.dashboardUserBulkUpdate);
router.route("/user/delete/:id").delete(dashboardController.dashboardUserDelete);

module.exports = router;
