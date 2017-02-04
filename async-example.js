const prompt  = require('prompt');
const request = require('request');
const async   = require('async');

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather?q='
const WEATHER_API_KEY = '88bfde3533d98e8a300a138ef668cda2';

async.waterfall([
  (callback) => {
    console.log("Here we'll ask for the user's input.");
    prompt.get({
      name: 'city',
      description: 'Enter city to fetch its current weather'
    }, (err, result) => {
      if (err) return callback(err);
      callback(null, result.city);
    });
  },
  (city, callback) => {
    console.log(`The user entered: ${city}`);
    const url = WEATHER_API_URL + WEATHER_API_KEY + '&units=imperial';
    request(url, (err, resp, body) => {
      if (err) return callback(err);
      callback(null, city, body);
    });
  }], 
  (err, city, weather) => {
    console.log("Here we'll output the result.");
    if (err) console.log(err);
    console.log(`The weather in ${city} \n ${weather}`);
});
