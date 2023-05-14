var express = require('express');
var router = express.Router();
var axios = require('axios')

const Movie = require('../models/Movie.model')
const Comment = require('../models/Comment.model')


//returns all movies
router.get('/all-movies', (req, res, next) => {
    Movie.find()
        .populate('addedBy')
        .then((movies) => {
            return movies.json
        })
        .catch((err) => {
            console.log(err)
        })
})


//to get specific movie details 
//not sure if i need this since all of the data will be loaded to frontend
router.get('/movie-details/:id', (req, res, next) => {
    {
        Movie.findById(req.params.id)
            .then((foundMovie) => {
                return res.json
            })
            .catch((err) => {
                console.log(err)
            })
    }
})

//add movie
router.post('/add-movie', (req, res, next) => {
    const movie = req.body
    Movie.create({
        movie
    })
        .then((newMovie) => {
            //not sure what to do here
        })
        .catch((err) => {
            console.log(err)
        })
})

//search function to get new movie details
router.get('/search-movies', (req, res, next) => {
    let { movieName } = req.body

    const apiUrl = `http://www.omdbapi.com/?apikey=${(process.env.API_KEY)}&`

    axios.get(apiUrl, { params: { t: movieName } })
        .then((movie) => {
            return movie.json
        })
        .catch((err) => {
            console.log(err)
        })
})





module.exports = router;