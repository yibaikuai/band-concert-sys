// const userDB = require("../db/user");
const mysql = require("mysql");
const userDB = mysql.createPool({
  host: "localhost",
  user: "yyy",
  password: "123456",
  database: "test",
});
const userService = {
  getUserInfo: (req, res) => {
    userDB.query("SELECT * from student", function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({
          code: 1,
          msg: error.sqlMessage,
        });
      } else {
        res.send({
          code: 0,
          data: results,
        });
      }
    });
  },
};

module.exports = userService;
