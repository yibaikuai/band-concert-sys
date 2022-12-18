const fanService = {
    addFan: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '添加成功'
        })
    },
    editFan: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '修改成功'
        })
    },
    deleteFan: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '删除成功'
        })
    },
    getFanOverLook: (req, res) => {
        res.json({
            code: 0,
            data: {
                fanNum: 100,
                mostLikeSong: '海阔天空',
                fanGenderData: [
                    {
                        value: 335,
                        name: '男'
                      },
                      {
                        value: 310,
                        name: '女'
                      }
                ],
                fanAgeData:[        {
                    value: 335,
                    name: '12-18'
                  },
                  {
                    value: 310,
                    name: '19-25'
                  },
                  {
                    value: 234,
                    name: '26-32'
                  },
                  {
                    value: 135,
                    name: '33-39'
                  },
                  {
                    value: 1548,
                    name: '40-46'
                  }]
            }
        })
    }

}

module.exports = fanService