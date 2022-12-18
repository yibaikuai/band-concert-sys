const songService = {
    addSong: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '添加成功'
        })
    },
    editSong: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '修改成功'
        })
    },
    deleteSong: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '删除成功'
        })
    }
}

module.exports = songService