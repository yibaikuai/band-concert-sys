const aboutMeService = {
    getMyInfo: (req, res) => {
        res.json({
            code: 0,
            data: {
                aboutMeData:[{
                    fanId:1,
                    fanName:"张三",
                    fanSex:"男",
                    fanAge:'21',
                    fanCareer:'厨师',
                    isEdit:false
                  }]
            }
        })
    },
    editMyInfo: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '修改成功'
        })
    },
    getMyLike: (req, res) => {
        let {likeThing} = req.query
        switch(likeThing){
            case 'band':res.json({
                code: 0,
                data: {
                    likeBandData:[
                        {
                            bandName: '大乐队',
                            bandLeader: '王小虎',
                            fundationTime: '2019-01-01',
                            bandNumber: 5,
                            albumNumber: 10,
                            isEdit:false,
                            isLike:false
                          },
                          {
                            bandName: '大乐队',
                            bandLeader: '王小虎',
                            fundationTime: '2019-01-01',
                            bandNumber: 5,
                            albumNumber: 10,
                            isEdit:false,
                            isLike:false
                          },
                    ]
                }
            })
            break;
            case 'song':res.json({

                code: 0,
                data: {
                    likeMusicData:[
                        {
                            songName:'我不配',
                            creator:'张碧晨',
                            albumBelong:'我不配',
                            isEdit:false
                          },
                          {
                            songName:'我不配',
                            creator:'张碧晨',
                            albumBelong:'我不配',
                            isEdit:false
                          }
                    ]}
            })
            break;
            case 'album':res.json({
                code: 0,
                data: {
                    likeAlbumData:[  {
                        albumName:'我不配',
                        performBand:'张碧晨',
                        releaseTime:'2020-01-01',
                        releaseCompany:'华语',
                        isEdit:false
                      },
                      {
                        albumName:'我不配',
                        performBand:'张碧晨',
                        releaseTime:'2020-01-01',
                        releaseCompany:'华语',
                        isEdit:false
                      },]
                }
            })
            break;
        }
    },
    getMyAttending : (req, res) => {
        res.json({
            code: 0,
            data: {
                concertData:[       {
                    bandName:'大乐队',
                    holdingTime:'2020-01-01',
                    holdingPlace:'大学生活动中心',
                    duration:'2小时',
                  },
                  {
                    bandName:'小乐队',
                    holdingTime:'2020-01-01',
                    holdingPlace:'大学生活动中心',
                    duration:'2小时',
                  },]
            }
        })
    },
    addMyAttending: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '添加成功'
        })
    },
    disMyAttending: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '取消成功'
        })
    },
    addMyLike: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '添加成功'
        })
    },
    disMyLike: (req, res) => {
        res.json({
            code: 0,
            data: {
            },
            msg: '取消成功'
        })
    }
}

module.exports = aboutMeService