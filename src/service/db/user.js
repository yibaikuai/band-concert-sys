const mysql = require('mysql')      
        const userDB = mysql.createPool({
          host     : 'localhost',
          user     : 'yyy',
          password : '123456',
          database : 'test'
        });
      module.exports = userDB