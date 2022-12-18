const db = require("../db/index");
const bandService = {
    getList:  (req, res) => {
      let {type} =req.query
      let  bandData= [
        {
        bandName: '大乐队',
        bandLeader: '王小虎',
        fundationTime: '2019-01-01',
        bandNumber: 5,
        albumNumber: 10,
        isEdit:false,
        isLike:false,
        memberData:[
            {
              memberId: 1,
              memberName: '李小虎',
              bandName: '大乐队',
              memberSex: '男',
              memberAge: 18,
              memberJob: '吉他手',
              memberPosition: '队长',
              joinTime: '2019-01-01',
              leaveTime: '2019-01-01',
              isEdit:false
            },
            {
              memberId: 2,
              memberName: '赵小虎',
              bandName: '大乐队',
              memberSex: '男',
              memberAge: 18,
              memberJob: '吉他手',
              memberPosition: '队员',
              joinTime: '2019-01-01',
              leaveTime: '2019-01-01',
              isEdit: false
            }
          ],

      },
      {
        bandName: '小乐队',
        bandLeader: '王小虎',
        fundationTime: '2019-01-01',
        bandNumber: 5,
        albumNumber: 10,
        isEdit:false,
        isLike:false,
        memberData:[
            {
              memberId: 1,
              memberName: '李小虎',
              bandName: '小乐队',
              memberSex: '男',
              memberAge: 18,
              memberJob: '吉他手',
              memberPosition: '队长',
              joinTime: '2019-01-01',
              leaveTime: '2019-01-01',
              isEdit:false
            },

          ],
      }
      ]
      if(req.query.page==='1'){
        bandData = bandData.slice(0,1)
      }else{
        bandData = bandData.slice(1,2)
      }
      let albumData=[
        {
          albumName:"《我是歌手》第一季",
          performBand:"大乐队",
          releaseTime:"2018-01-01",
          releaseCompany:"腾讯",
          isEdit:false,
          isLike:true
        },
        {
          albumName:"《我是歌手》第二季",
          performBand:"大乐队",
          releaseTime:"2018-01-01",
          releaseCompany:"腾讯",
          isEdit: false,
          isLike: false
        }
      ]
      let songData=[{
        songName:"月亮之上",
        bandName:"大乐队",
        albumBelong:"七里香",
        isEdit:false,
        isLike:true
      },
        {
          songName: '稻香',
          bandName: '小乐队',
          albumBelong: '七里香',
          isEdit: false,
          isLike: false
        }
      ]
      let performData=[
        {
          bandName: "大乐队",
          holdingTime: "2020-01-01",
          holdingPlace: "大学生活动中心",
          duration: "1小时",
          isEdit: false,
          isLike: false,
          actingSongData: [
            {
              id:1,
              holdingTime: "2020-01-01",
              bandName: "大乐队",
              songOrder: 1,
              songName: "歌曲6",
              isEdit: false
            },
            ]
        },
        {
          bandName: "小乐队",
          holdingTime: "2020-01-01",
          holdingPlace: "大学生活动中心",
          duration: "1小时",
          isEdit: false,
          isLike: false,
          actingSongData: [
            {
              id:1,
              holdingTime: "2020-01-01",
              bandName: "小乐队",
              songOrder: 1,
              songName: "歌曲1",
              isEdit: false
            },
            {
              id:2,
              holdingTime: "2020-01-01",
              bandName: "小乐队",
              songOrder: 2,
              songName: "歌曲2",
              isEdit: false
            }
          ]
        }
      ]
      let fanData=[
        {
          fanId:1,
          fanName:"张三",
          fanSex:"男",
          fanAge:'21',
          fanCareer:'厨师',
          isEdit:false
        },
        {
          fanId:2,
          fanName:"李四",
          fanSex:"男",
          fanAge:'21',
          fanCareer:'厨师',
          isEdit: false
        }
          
      ]
         switch(type){
          case '1':
            res.json({
              code: 0,
              data: {
                total: 2,
                bandData
              }
            })
            break;
            case '2':
              res.json({
                code: 0,
                data: {
                  total: 2,
                  albumData
                }
              })
              break;
              case '3':
                res.json({
                  code: 0,
                  data: {
                    total: 2,
                    songData
                  }
                })
                break;
                case '4':
                  res.json({
                    code: 0,
                    data: {
                      total:2,
                      performData
                    }
                  })
                  break;
                  case '5':
                    res.json({
                      code: 0,
                      data: {
                        total: 2,
                        fanData
                      }
                    })
                    break;

          }
    },
    addBand: (req, res) => {
      res.json({
        code: 0,
        data: {
        },
        msg: '添加成功'
      })
    },
    editBand: (req, res) => {
      res.json({
        code: 0,
        data: {
        },
        msg: '修改成功'
      })
    },
    deleteBand: (req, res) => {
      res.json({
        code: 0,
        data: {
        },
        msg: '删除成功'
      })
    },
    addMember: (req, res) => {
      res.json({
        code: 0,
        data: {
        },
        msg: '添加成功'
      })
    },
    editMember: (req, res) => {
      res.json({
        code: 0,
        data: {
        },
        msg: '修改成功'
      })
    },
    deleteMember: (req, res) => {
      res.json({
        code: 0,
        data: {
        },
        msg: '删除成功'
      })
    },
}

module.exports = bandService;