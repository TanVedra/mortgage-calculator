const mysql = require('mysql');
const db_config = {
  host: 'eu-cdbr-west-01.cleardb.com',
  user: 'b4e702a884a466',
  password: 'a581d307',
  database: 'heroku_d5ba97fca6d1acb',
};

module.exports = mysql.createPool(db_config);
