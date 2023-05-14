var express = require('express');
var router = express.Router();

const User = require('../models/User.model')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//get all users
router.get('/all-users', (req, res, next) => {
  User.find()
    .then((users) => {
      console.log(users)
      res.json(users)

    })
    .catch((err) => {
      console.log(err)
    })

})

//update user
router.post('/update-user/:id', (req, res, next) => {
  const { id } = req.params
  User.findByIdAndUpdate(id)
    .then((updatedUser) => {
      //not sure what to do here
    })
    .catch((err) => {
      console.log(err)
    })
})

//delete user
router.get('/delete-user/:id', (req, res, next) => {
  const { id } = req.params
  User.findByIdAndDelete(id)
    .then(() => {
      //not sure what to do here
    })
    .catch((err) => {
      console.log(err)
    })
})
module.exports = router;
