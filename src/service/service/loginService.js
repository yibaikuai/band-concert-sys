const db = require("../db/index");
const loginService = {
  Login: async (req, res) => {
    let role = '';
    const { username, password } = req.body;
    let addSql = "select id,username,password from users where username=?";
    let addSqlParams = [username];
    await db.query(addSql, addSqlParams,async (err, result)=> {
      if (err) {
        res.json({
          code: 1,
          msg: "登录失败！",
        });
      }
      if (result.length !== 0 && password === result[0].password) {
        if(username === 'root'){
          role = 'admin'
        }else if(username === 'singer'){
          role = 'singer'
        }else if(username === 'yyy'){
          role = 'fan'
        }
        res.json({
          code: 0,
          msg: "登录成功！",
          data: {  result,role ,accessToken: 'a-token',bandName:'大乐队',total:2},
        });
      } else {
        res.json({
          code: 1,
          msg: "登录失败！请校验账号或密码",
        });
      }
    });
  },
  Create: async (req, res) => {
    const { username, password } = req.body;
    var addSql = "select username from users where username=?";
    var addSqlParams = [username];
    await db.query(addSql, addSqlParams, async (err, result) => {
      if (err) {
        res.json({
          code: 1,
          msg: "注册失败！",
        });
      }
      if (result)
        res.json({
          code: 0,
          msg: "注册成功！",
        });
    });
  },
  Logout: async (req, res) => {
    res.json({
      code: 0,
      msg: "退出成功！",
    });
  }
};

module.exports = loginService;
