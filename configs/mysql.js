let mysql = require('mysql');

// createConnection
// createPool
let connection = mysql.createPool({
    host: 'localhost',
    database : 'markers',
    user: 'root',
    password: 'root',
    port: '3306',

});

// connection.connect(function(err) {
//   if (!err) {
//       console.info('Mysql is connected');
//   } else {
//       console.info('Mysql connections error');
//   }
// });

module.exports = connection;