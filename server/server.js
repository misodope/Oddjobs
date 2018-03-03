const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const path = require('path');
const db = require('../database/database.js');
const geocode = require('../helpers/geocoding.js');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 1337;
const storage = multer.diskStorage({
  destination: path.join(__dirname, '/imageUploads'),
  filename(req, file, cb) {
    cb(null, `${new Date().getUTCMilliseconds()}-${file.originalname}`);
  }
});

const upload = multer({storage});

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
      console.log(results);
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
    const values = [currentAddress, currentLat, currentLng, req.body.brief, req.body.detailed, req.body.payment, req.files[0].filename, req.session.username];
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

app.listen(port, () => console.log("Connected to port:", port));
