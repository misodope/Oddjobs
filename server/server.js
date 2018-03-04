const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const path = require('path');
const db = require('../database/database.js');
const geocode = require('../helpers/geocoding.js');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


const app = express();
const port = process.env.PORT || 1337;
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_KEY,
    region: 'us-east-1'
});

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'oddjobs-best',
    key: function(req, file, cb) {
      cb(null, `${new Date()}-${file.originalname}`);
    }
  })
});

let currentAddress;
let currentLat;
let currentLng;

app.use(session({
  secret:'2hard2know',
  resave: 'false',
  saveUninitialized: true,
  cookie: {maxAge: 360000}
}));
app.use(parser.json());
app.use(express.static(path.join(__dirname, '../client/src')));

let auth = function(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.status(404).send();
  }
};

app.post('/search/posts', (req, res) => {
  db.getPosts(req.body, (results) => {
    if (results) {
      res.send(results);
    }
  })
});

app.post('/current/address', (req, res) => {
  currentAddress = req.body.location[0].formatted_address;
  currentLat = req.body.location[0].geometry.location.lat;
  currentLng = req.body.location[0].geometry.location.lng;
  console.log("This is the current address",currentAddress, currentLat, currentLng)
  res.end();
});

app.post('/check/account', (req, res) => {
  if (req.body.password === '' || req.body.username === '') {
    res.status(404).send();
  } else {
    db.checkUser(req.body, (results) => {
      if (results.length === 0) {
        res.status(404).send();
      } else {
        bcrypt.compare(req.body.password, results[0].password, (error, result) => {
          if (result) {
            req.session.regenerate(() => {
              req.session.username = req.body.username;
              res.send(result);
            })
          } else if (error) {
            res.send(error);
          }
        })
      }
    })
  }
});

app.post('/create/account', (req, res) => {
  const saltRounds = 10;
  if (req.body.password === '' || req.body.email === '') {
    res.status(404).send();
  } else {
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
      const values = [req.body.firstName, req.body.lastName, req.body.email, hash];
      db.createUser(values, (results) => {
        if (results) {
          res.send(results);
        }
      })
    })
  }
})

app.post('/logout', function(req, res) {
  req.session.destroy();
  res.status(200).send();
})

app.post('/create/post', upload.any(), function(req, res) {
  if (req.session.username) {
    const values = [currentAddress, currentLat, currentLng, req.body.brief, req.body.detailed, req.body.payment, req.files[0].location, req.session.username];
    db.createPost(values, (results) => {
      if (results) {
        res.send(results);
      }
    })
  } else {
    res.status(404).send();
  }
})

app.get('/job/location', (req, res) => {
  geocode.getCoordinates(req.query.address, (results) => {
    if (results) {
      res.send(results);
    }
  });
});

app.get('/myPosted/jobs', auth, (req, res) => {
  db.getMyPosts(req.session.username, (results) => {
    if (results) {
      res.send(results);
    }
  })
})

app.get('/*', (req, res) => {
  res.send(path.join(__dirname, '../client/src'));
})

app.listen(port, () => console.log("Connected to port:", port));
