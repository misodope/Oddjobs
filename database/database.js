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

const getPosts = function(value, callback) {
  const sqlQuery = `SELECT * FROM posts`;
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  })
}

const createPost = function(value, callback) {
  console.log(value);
  const sqlQuery = `INSERT INTO posts (address, lat, lng, brief, detailed, payment, image, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT users.id FROM users WHERE users.email = '${value[value.length - 1]}'))`;
  connection.query(sqlQuery, value, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  })
}

const checkUser = function(value, callback) {
  const sqlQuery = `SELECT email, password FROM users WHERE email = "${value.username}"`;
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  })
}

const createUser = function(value, callback) {
  const sqlQuery = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
  connection.query(sqlQuery, value, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  })
}

const getMyPosts = function(value, callback) {
  const sqlQuery = `SELECT * FROM posts JOIN users on posts.user_id = users.id AND users.email = "${value}"`;
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  })
}

module.exports = {
  connection,
  getPosts,
  checkUser,
  createUser,
  createPost,
  getMyPosts
}
