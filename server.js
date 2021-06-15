'use strict';

require('dotenv').config();
const express = require('express');
// const weatherData = require('./assets/weather.json')
const cors = require('cors');
const axios = require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
})

server.get('/weather', weatherhandler);
server.get('/movie', moviehandler);

class ForCast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `${item.min_temp},${item.max_temp},${item.weather.description}`;
  }
}

function weatherhandler(req, res) {
  let key1 = process.env.WEATHER_KEY;
  let city = req.query.searchQuery;

let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key1}`;
console.log (url);
axios
.get(url)
  .then(found => {
    const weatherArr = found.data.data.map(value => {
      return new ForCast(value);
    })
    res.send(weatherArr);
  })

  .catch(error => {
    res.status(500).send(`${error}`);
  })
}

class ForMovie{
  constructor(item){
    this.title=item.title;
    this.overview=item.overview;
    this.avgvotes=item.vote_average;
    this.totalVotes=item.vote_count;
    this.imageurl=`https://image.tmdb.org/t/p/w500${item.poster_path}`;
    this.popularity=item.popularity;
    this.releasedate=item.release_date;
  }
}

function moviehandler(req,res){
  let key2=process.env.MOVIE_API_KEY;
  let city=req.query.searchQuery;

  let url=`https://api.themoviedb.org/3/search/movie?api_key=${key2}&query=${city}`;


axios
.get(url)
.then(found=>{
  const movieArr=found.data.results.map(Element=>{
    return new ForMovie(Element);
  })
  res.send(movieArr);
})

.catch(error=>{
  res.status(500).send(`{$error}`);
})
}