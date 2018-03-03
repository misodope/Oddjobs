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

module.exports = {
  getCoordinates
}
