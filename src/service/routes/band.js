var express = require('express');
var router = express.Router();

const bandService = require('../service/bandService');

/* GET users listing. */
router.get('/list',bandService.getList)
router.post('/band/addBand',bandService.addBand)
router.put('/band/editBand',bandService.editBand)
router.delete('/band/deleteBand',bandService.deleteBand)
router.post('/band/addMember',bandService.addMember)
router.put('/band/editMember',bandService.editMember)
router.delete('/band/deleteMember',bandService.deleteMember)
module.exports = router;