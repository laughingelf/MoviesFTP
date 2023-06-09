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
        .populate({
            path: 'userRatings',
            populate: { path: "username" }
        })
        .then((movies) => {
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


    Movie.find({ imdbID: movie.imdbID })
        .then((foundMovie) => {
            console.log('this is the bs found  movie" ', foundMovie)
            if (foundMovie.length) {
                res.json({
                    message: 'Movie is already in Database',
                    f_id: foundMovie[0]._id
                })
                return;
            }

            return Movie.create({
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
                BoxOffice: movie.BoxOffice,
                imdbID: movie.imdbID

            })

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
router.get('/search-movies/:search', (req, res, next) => {
    const { search } = req.params

    console.log('these are the params: ', search)

    const options = {
        method: 'GET',
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${search}`,
        params: {
            exact: 'false',
            titleType: 'movie'
        },
        headers: {
            'X-RapidAPI-Key': '39af2f4383msha9a56f3ac4a9f8ep12c99ajsn19417c0ac7dd',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    axios.request(options)
        .then((results) => {
            console.log(results.data)
            res.json(results.data)
        })
        .catch((err) => {
            console.log(err)
        })
})






// router.get('/search-movies/:search', (req, res, next) => {
//     const { search } = req.params

//     console.log('these are the params: ', search)

//     const apiKey = '207ef136'

//     const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`

//     axios.get(apiUrl, { params: { t: search } })
//         .then((movie) => {
//             console.log('THIS IS THE MOVIE', movie)
//             res.json(movie)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })





module.exports = router;