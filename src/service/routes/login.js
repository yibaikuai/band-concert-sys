var express = require('express');
var router = express.Router();
const expressJoi = require('@escook/express-joi')
const {reg_login_schema } = require('../schema/user')

const loginService = require('../service/loginService');

/* GET users listing. */
router.post('/login',expressJoi(reg_login_schema),loginService.Login)
router.post('/user/register',expressJoi(reg_login_schema),loginService.Create)
router.post('/user/logout',loginService.Logout)
module.exports = router;
