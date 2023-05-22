var express = require('express');
var router = express.Router();
const fileUploader = require('../cloudinary.config')
const User = require('../models/User.model')

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

router.post('/update-photo/:id', fileUploader.single('imageUrl'), (req, res, next) => {
  const { id } = req.params
  const { imageUrl } = req.body
  console.log('req path', imageUrl)
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



module.exports = router;
