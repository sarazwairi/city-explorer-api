'use strict';

const axios=require('axios');
require('dotenv').config();

module.exports=moviehandler;

class ForMovie{
    constructor(item){
      this.title=item.title;
      this.overview=item.overview;
      this.avgvotes=item.vote_average;
      this.votes=item.vote_count;
      this.image=item.poster_path;
      this.popularity=item.popularity;
      this.date=item.release_date;
    }
  }


  function moviehandler(req,res){
    let key=process.env.MOVIE_API_KEY;
    let city=req.query.city;
  
        let url=`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}`;
  
  
  axios
  .get(url)
  .then(found=>{
    const movieArr=found.data.results.map(element=>{
      return new ForMovie(element);
    })
    res.send(movieArr);
  })

  .catch(err=>{
    res.status(500).send(`{$err}`);
  })
  }