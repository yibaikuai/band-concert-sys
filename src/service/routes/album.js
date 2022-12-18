var express = require('express');
var router = express.Router();

const albumService = require('../service/albumService');

router.post('/album/addAlbum',albumService.addAlbum)
router.put('/album/editAlbum',albumService.editAlbum)
router.delete('/album/deleteAlbum',albumService.deleteAlbum)


module.exports = router;