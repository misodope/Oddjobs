const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'oddjobs'
});

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log("mySQL Database Connected");
})

module.exports = connection
