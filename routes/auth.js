var express = require('express');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
var router = express.Router();

const saltRounds = 10

const isAuthenticated = require('../middleware/isAuthenticated')







const User = require('../models/User.model')

//login
router.post('/login', (req, res, next) => {
    console.log('Logging in')
    const { email, password } = req.body
    console.log(req.body)

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password" })
        return
    }

    User.findOne({ email })
        .then((foundUser) => {
            console.log('a user was found', foundUser)

            if (!foundUser) {
                res.status(401).json({ message: "user not found" })
                return
            }
            const passwordVerified = bcryptjs.compareSync(password, foundUser.password)


            if (passwordVerified) {

                const { _id, email, username, firstName, lastName, birthDate } = foundUser

                const payload = { _id, username, email, firstName, lastName, birthDate }

                const authToken = jwt.sign(
                    payload,
                    process.env.SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken: authToken, user: payload })
            } else {
                res.status(401).json({ message: "Unable to authenticate user." })
            }

        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }))
})

//logout
router.get('/logout', (req, res, next) => {
    console.log('Logging out')
})

//signUp
//***creates the user */
router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body
    // console.log('hahelajlkje', req.body)

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide Email,Password, and Name." })
        return
    }

    // //check the password strength
    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // if (!regex.test(password)) {
    //     res
    //         .status(500)
    //         .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    //     return;
    // }

    User.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "User already exists." });
                return;
            }
            const salt = bcryptjs.genSaltSync(saltRounds)
            const hashedPassword = bcryptjs.hashSync(password, salt)

            User.create({
                username,
                email,
                // birthDate,
                password: hashedPassword
            })
                .then((createdUser) => {
                    //deconstruct new user to omit password
                    const { email, _id, username } = createdUser

                    const payload = { email, _id, username, firstName: '', lastName: '', birthDate: '' }

                    const authToken = jwt.sign(
                        payload,
                        process.env.SECRET,
                        { algorithm: 'HS256', expiresIn: "6h" }
                    )

                    // console.log('Signup lines', payload)

                    res.status(201).json({ authToken: authToken, user: payload })

                    // req.session.user.createdUser
                    // console.log(createdUser)
                    // res.json(createdUser)
                    //not sure how to handle this
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({ message: "Internal Server Error" })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(401).json({ message: "user already exist!" })
        })

})



router.get('/verify', isAuthenticated, (req, res, next) => {
    User.findById(req.user._id)
        .then((foundUser) => {
            delete foundUser._doc.password
            res.status(200).json(foundUser)
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = router;
