const Comment = require('./models/Comment.model')

const id = '646cd9316ad96eb1263b8d02'

Comment.find({ username: id }).exec
    .then((foundRatings) => {
        console.log('found RATINGS', foundRatings)
        res.json(foundRatings)
    })
    .catch((err) => {
        console.log(err)
    })