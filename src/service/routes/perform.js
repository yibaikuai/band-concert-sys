const express = require('express');
const router = express.Router();
const performService = require('../service/performService');

router.post('/perform/addPerform',performService.addPerform)
router.put('/perform/editPerform',performService.editPerform)
router.delete('/perform/deletePerform',performService.deletePerform)
router.post('/perform/addSongPerform',performService.addSongPerform)
router.put('/perform/editSongPerform',performService.editSongPerform)
router.delete('/perform/deleteSongPerform',performService.deleteSongPerform)


module.exports = router;