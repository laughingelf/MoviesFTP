var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie.model')
const Comment = require('../models/Comment.model')

//add comment
router.post('/add-comment/:id', (req, res, next) => {
    Comment.create({
        username: req.session.username._id,
        comment: req.body.comment,
        rating: req.body.rating
    })
        .then((newComment) => {
            console.log(newComment)
            res.json(newComment)
        })
        .catch((err) => {
            console.log(err)
        })
})

//edit comment
router.post('/update-comment/:id', (req, res, next) => {
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