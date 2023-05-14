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
            ///not sure what to do here
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
            //not sure what to here
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
            //not sure what to do here
        })
        .catch((err) => {
            console.log(err)
        })
})





module.exports = router;