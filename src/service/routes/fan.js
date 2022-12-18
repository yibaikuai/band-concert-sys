const express = require('express');
const router = express.Router();

const fanService = require('../service/fanService');

router.post('/fan/addFan',fanService.addFan)
router.put('/fan/editFan',fanService.editFan)
router.delete('/fan/deleteFan',fanService.deleteFan)
router.get('/fan/getFanOverLook',fanService.getFanOverLook)

module.exports = router;