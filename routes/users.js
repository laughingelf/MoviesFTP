var express = require('express');
var router = express.Router();
const fileUploader = require('../middleware/cloudinary.config')
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')
const mongoose = require('mongoose')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//get all users
//working
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

router.get('/user-posts/:id', (req, res, next) => {
  const { id } = req.params
  User.findById(id)
    .then((foundUser) => {
      Comment.find({ username: foundUser._id })
        .then((foundRatings) => {
          console.log('found RATINGS', foundRatings)
          res.json(foundRatings)
        })
        .catch((err) => {
          console.log(err)
        })
    })
})



//update user
router.post('/update-user/:id', (req, res, next) => {
  const { id } = req.params
  const profileInfo = req.body
  User.findByIdAndUpdate(id, profileInfo, { new: true })
    .then((updatedUser) => {
      //not sure what to do here
      console.log('updated user', updatedUser)
      res.json(updatedUser)
    })
    .catch((err) => {
      console.log(err)
    })
})

//delete user
router.get('/delete-user/:id', (req, res, next) => {
  const { id } = req.params
  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      res.json(deletedUser)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/update-photo/:id', fileUploader.single('imageUrl'), (req, res, next) => {
  const { id } = req.params
  const { imageUrl } = req.body
  // console.log('req path', imageUrl)
  User.findByIdAndUpdate(id,
    {
      profilePicUrl: imageUrl
    },
    { new: true })
    .then((updatedUser) => {
      res.json(updatedUser)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/update-photo', fileUploader.single("image"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  console.log("this is file", req.file)
  res.json({ image: req.file.path });

})



module.exports = router;
