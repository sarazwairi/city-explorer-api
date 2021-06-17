'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const server = express();
server.use(cors());



const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
})

const weatherhandler=require('./modules/weather.js');
server.get('/weather', weatherhandler);

const moviehandler=require('./modules/movie.js');
server.get('/movie', moviehandler);
