const express = require('express');
const dashboardController = require('../controller/dashboard.controller');
const router  = express.Router()


// router.route('/').get().post().delete().patch().put() --> one path

// router.route('/random').get(dashboardController)  
router.route('/').get(dashboardController.dashboardHome)  


module.exports = router; 