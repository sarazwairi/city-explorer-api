'use strict';

require('dotenv').config();
const express = require('express');
const weatherData = require('./assets/weather.json')
const cors = require('cors');
const e = require('express');

const server = express();
server.use(cors());

const PORT = process.env.PORT||3002;

server.listen(PORT, () => {
    console.log(`Server is running on port  ${PORT}`)
})

server.get('/',(req,res)=>{
  res.send('HOME PAGE') ;
});

server.get('/weather', (req, res) => {
  let lat=req.query.lat;
  let lon=req.query.lon;
  let searchQuery=req.query.searchQuery;

if ( lat==weatherData.lat && lon==weatherData.lon && searchQuery==weatherData.city_name){
    res.send(weatherData.data);
}else{
    res.status(500).send("Something went wrong.");
}
});

//localhost 3002 
server.get("*", (req, res) => {
    res.status(404).send("Sorry, this page not found");
  });
