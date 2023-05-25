var express = require('express');
var router = express.Router();


const Movie = require('../models/Movie.model')
const Comment = require('../models/Comment.model')

//add comment
router.post('/add-comment/:id', (req, res, next) => {

    const { id } = req.params
    console.log('this is the id', id)
    console.log('this is the body', req.body)
    Comment.create({
        username: req.body.username,
        userComments: req.body.userComments,
        overallRating: req.body.overallRating,
        watchAgainRating: req.body.watchAgainRating,
        trashCanRating: req.body.trashCanRating,
        movieId: req.body.movieId
    })
        .then((newComment) => {
            console.log(newComment)
            Movie.findByIdAndUpdate(id, { $push: { userRatings: newComment._id } })
                .then((updatedMovie) => {
                    res.json(updatedMovie)
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

//edit comment
router.post('/update-comment/:id', (req, res, next) => {
    console.log('this is the id', req.params)
    const { id } = req.params
    Comment.findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedComment) => {
            console.log(updatedComment)
            res.json(updatedComment)
        })
        .catch((err) => {
            console.log(err)
        })
})


//delete comment
router.get('/delete-comment/:id', (req, res, next) => {
    const { id } = req.params
    Comment.findByIdAndDelete(id)
        .then((delComment) => {
            console.log(delComment)
            res.json(delComment)
        })
        .catch((err) => {
            console.log(err)
        })
})





module.exports = router;