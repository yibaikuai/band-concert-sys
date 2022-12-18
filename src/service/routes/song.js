const express = require('express');
const router = express.Router();

const songService = require('../service/songService');

router.post('/song/addSong',songService.addSong)
router.put('/song/editSong',songService.editSong)
router.delete('/song/deleteSong',songService.deleteSong)

module.exports = router;