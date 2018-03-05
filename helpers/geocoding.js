const config = require('../config.js');
const axios = require('axios');

const getCoordinates = function(address, callback) {
  console.log(address)
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.GOOGLE_GEOCODE}`)
  .then((output) => {
    callback(output.data.results[0].geometry.location);
  })
  .catch((error) => {
    callback(error);
  })
};

// app.get('/job/location', (req, res) => {
//   geocode.getCoordinates(req.query.address, (results) => {
//     if (results) {
//       res.send(results);
//     }
//   });
// });


module.exports = {
  getCoordinates
}
