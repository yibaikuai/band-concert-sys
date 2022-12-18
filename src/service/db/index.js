const mysql = require('mysql')

const db = mysql.createPool({
    host     : '服务器IP',
    user     : '用户名',
    password : '密码',
    database : '数据库名'
  });

module.exports = db