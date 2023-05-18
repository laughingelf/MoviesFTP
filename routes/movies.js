var express = require('express');
var router = express.Router();
var axios = require('axios')

const Movie = require('../models/Movie.model')
const Comment = require('../models/Comment.model')


//returns all movies
//working
router.get('/all-movies', (req, res, next) => {
    Movie.find()
        .populate('addedBy')
        .then((movies) => {
            // console.log(movies)
            res.json(movies)
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
                console.log(foundMovie)
                res.json(foundMovie)
            })
            .catch((err) => {
                console.log(err)
            })
    }
})

//add movie
//Working
router.post('/add-movie', (req, res, next) => {
    const movie = req.body
    console.log(movie)
    Movie.create({
        Title: movie.Title,
        Year: movie.Year,
        Rated: movie.Rated,
        Runtime: movie.Runtime,
        Genre: movie.Genre,
        Director: movie.Director,
        Actors: movie.Actors,
        Plot: movie.Plot,
        Awards: movie.Awards,
        Poster: movie.Poster,
        imdbRating: movie.imdbRating,
        imdbVotes: movie.imdbVotes,
        BoxOffice: movie.BoxOffice
    })
        .then((newMovie) => {
            console.log(newMovie)
            res.json(newMovie)
        })
        .catch((err) => {
            console.log(err)
        })
})

//search function to get new movie details
//working
router.get('/search-movies', (req, res, next) => {
    const { search } = req.body
    console.log(search)

    const apiKey = '207ef136'

    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`

    axios.get(apiUrl, { params: { t: search } })
        .then((movie) => {
            // console.log('THIS IS HT EMOVE', movie)
            res.json(movie)
        })
        .catch((err) => {
            console.log(err)
        })
})





module.exports = router;