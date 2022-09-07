const path = require('path');


module.exports.dashboardHome = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../views/dashboard.html'));
 }

module.exports.randomUser = (req, res, next) => {
    res.send('hi random user now')
 }


