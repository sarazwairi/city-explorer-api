'use strict';

const axios=require('axios');
require('dotenv').config();

module.exports=weatherhandler;

class ForCast {
    constructor(item) {
      this.date = item.valid_date;
      this.description = `${item.min_temp},${item.max_temp},${item.weather.description}`;
    }
  }



  function weatherhandler(req, res) {
    let key = process.env.WEATHER_KEY;
    let getweather = req.query.city;
  
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${getweather}&key=${key}`;
  console.log (url);
  axios
  .get(url)
    .then(found => {
      const weatherArr = found.data.data.map(value => {
        return new ForCast(value);
      })
      res.send(weatherArr);
    })
  
    .catch(err => {
      res.status(500).send(`${err}`);
    })
  }