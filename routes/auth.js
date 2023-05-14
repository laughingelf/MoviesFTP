var express = require('express');
var router = express.Router();

const User = require('../models/User.model')

//login
router.post('/login', (req, res, next) => {
    console.log('Logging in')
})

//logout
router.get('/logout', (req, res, next) => {
    console.log('Logging out')
})

//signUp
//***creates the user */
router.post('/signup', (req, res, next) => {
    const { firstName, lastName, username, email, birthDate, password } = req.body
    console.log('hahelajlkje', req.body)

    // //check the password strength
    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // if (!regex.test(password)) {
    //     res
    //         .status(500)
    //         .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    //     return;
    // }

    User.create({
        firstName,
        lastName,
        username,
        email,
        birthDate,
        password
    })
        .then((createdUser) => {
            // req.session.user.createdUser
            // console.log(createdUser)
            res.json(createdUser)
            //not sure how to handle this
        })
        .catch((err) => {
            console.log(err)
        })
})



module.exports = router;
