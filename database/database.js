const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database:'oddjobs'
});

connection.connect((error) => {
  if (error) {
    console.log('ERRRORRRR WITH DB', error);
  }
  console.log("mySQL Database Connected");
})

const usersTable = `CREATE TABLE IF NOT EXISTS users (
  id int not null auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  password varchar(2000) not null,
  PRIMARY KEY (id),
  UNIQUE (email)
)`;

const postsTable = `CREATE TABLE IF NOT EXISTS posts (
  id int not null auto_increment,
  address varchar(255) not null default '2 Placeholder Address Road',
  lat varchar(50) not null,
  lng varchar(50) not null,
  brief varchar(1000) not null,
  detailed varchar(10000) not null,
  payment int not null,
  image varchar(1000),
  user_id int not null,
  taken tinyint not null default 0,
  taken_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  CHECK (taken_id <> user_id)
)`;

connection.query(usersTable, (error) => {
  if (error) {
    throw error;
  }
});

connection.query(postsTable, (error) => {
  if (error) {
    throw error;
  }
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
