/* Dependency */
const express = require('express');
const { profileHome, profileAddress , profileOrderHistory, profileEducation} = require('../controller/profile.controller');
const router = express.Router()


router.get('/', profileHome)  
router.get('/address', profileAddress)   
router.get('/order-history', profileOrderHistory)   
router.get('/education', profileEducation)   


module.exports = router;