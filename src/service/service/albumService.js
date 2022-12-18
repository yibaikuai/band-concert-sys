const albumService = {
    addAlbum: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '添加成功'
        })
    },
    editAlbum: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '修改成功'
        })
    },
    deleteAlbum: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '删除成功'
        })
    }
}

module.exports = albumService