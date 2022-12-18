const express = require('express');
const router = express.Router();

const aboutMeService = require('../service/aboutMeService');

router.get('/aboutMe/info', aboutMeService.getMyInfo)
router.put('/aboutMe/editMyInfo', aboutMeService.editMyInfo)
router.get('/aboutMe/getMylike', aboutMeService.getMyLike)
router.get('/aboutMe/getMyAttending', aboutMeService.getMyAttending)
router.post('/aboutMe/addMyLike', aboutMeService.addMyLike)
router.post('/aboutMe/addMyAttending', aboutMeService.addMyAttending)
router.delete('/aboutMe/disLike', aboutMeService.disMyLike)
router.delete('/aboutMe/disMyAttending', aboutMeService.disMyAttending)

module.exports = router;