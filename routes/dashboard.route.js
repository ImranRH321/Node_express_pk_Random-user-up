const express = require("express");
const dashboardController = require("../controller/dashboard.controller");
const router = express.Router();


// router.route('/').get().post().delete().patch().put() --> one path

router.route("/").get(dashboardController.dashboardHome);
router.route("/user/random").get(dashboardController.dashboardRandomUser);
router.route("/user/all").get(dashboardController.dashboardUserAll);
router.route("/user/save").post(dashboardController.dashboardUserSave); 
router.route('/user/save/form').get(dashboardController.dashboardUserSaveForm)//html-form
router.route("/user/update/:id").patch(dashboardController.dashboardUserUpdate);
router.route("/user/bulk-update").patch(dashboardController.dashboardUserBulkUpdate);
router.route("/user/delete/:id").delete(dashboardController.dashboardUserDelete);

module.exports = router;
