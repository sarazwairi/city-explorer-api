'use strict';

require('dotenv').config();
const express= require('express');
const weatherData=require('./assets/weather.json')
const cors=require('cors');

const server=express();
server.use(cors());

const PORT = process.env.PORT;

// const PORT=3001;
server.listen(PORT,()=>{
    console.log(`Server is running on port  ${PORT}`)
})
class Forecast {
    constructor(date,description){
        this.date=date;
        this.description=description;
    }
}
server.get('/weather',(req,res)=>{
    let city=req.query.cityName;
    let lat=req.query.lat;
    let long=req.query.lon;
    let searchQuery=weatherData.find((element)=>{
        if(city.toLowerCase()==element.city_name.toLowerCase()&& lat==element.lat && long==element.lon)
            return element;
})


try{
    let weatherArr=[];
    let date;
    let description;
    let weatherData;
    for (let i=0;i<searchQuery.data.length;i++){
        date=searchQuery.data[i].valid_date;
        description=`low of ${searchQuery.data[i].low_temp},high of ${searchQuery.data[i].max_temp}with ${searchQuery.data[i].weather.description}`;
        weatherData=new Forecast(date,description);
        weatherArr.push(weatherData); 
    }
    res.send(weatherArr);
}catch(par){
    res.send('error')
}
    })