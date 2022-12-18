var express = require('express');
var router = express.Router();

// const userService = require('../controllers/userController');
const userService = require('../service/userService');
/* GET users listing. */
router.get('/users', userService.getUserInfo)
// 

module.exports = router;
