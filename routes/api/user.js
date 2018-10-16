const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// user model
const User = require('../../models/User');
const router = express.Router();
const {secretOrKey} = require('../../config/keys');
// input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
/*
* @route GET api/user/test
* @desc  Tests user route
* */
router.get('/test', (req, res, next) => {
    res.json({
        message: "users works"
    })
});

/*
* @route POST api/user/reqister
* @desc  Tests user route
* */
router.post('/register', (req, res, next) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400)
            .json({message: 'incorrect input ', errors})
    }

    User.findOne({email: req.body.email})
    // it will always return [] or [{},{}] with users
        .then(doc => {
            if (doc) {
                errors.email = "Email already exists"
                return res.status(400)
                    .json({
                        errors
                    })
            } else {
                //var url = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: '404'});
                // mm to return a place holder
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
                const newUser = new User({
                    email: req.body.email,
                    name: req.body.name,
                    avatar,
                    // password
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.status(200)
                                    .json({
                                        user: user
                                    })
                            })
                            .catch(err => console.log(err)
                            )
                    })
                })
            }
        }) // wont fail unless db fails
        .catch(err => {
            console.log(err);
            res.status(500)
                .json({
                    message: "Failed to look up that email server error"
                })
        })
});

/*
* @route POST api/user/reqister
* @desc  loginUser /return JWT
* */

router.post('/login', (req, res,) => {
    const {errors, isValid} = validateLoginInput(req.body);


    const {email, password} = req.body;
    // find the uer by email
    if (!isValid) {
        return res.status(400)
            .json({
                message: "login failed",
                error: errors
            })
    }
    User.findOne({email})
        .then(user => {
            // if user is there
            if (!user) {
                errors.email = "Email not found"
                return res.status(404)
                    .json({
                        message: "Email not found",
                        error: errors
                    })
            }
            // check the password

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // user matched
                        // jwt paylaod
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar
                        }
                        // token
                        jwt.sign(payload,
                            secretOrKey,
                            {expiresIn: 3600 * 3}, (err, token) => {
                                res.status(200)
                                    .json({
                                        message: "login success",
                                        user: {
                                            id: user._id,
                                            userName: user.name,
                                            avatar: user.avatar
                                        },
                                        token: "Bearer " + token
                                    })
                            });

                    } else {
                        errors.password = "password incorrect";
                        return res.status(400)
                            .json({errors})
                    }
                })
        }).catch(err => {
        console.log(err);
        res.status(500)
            .json({
                message: "Failed to look up that email server error"
            })
    })
})

/*
* @route POST api/user/current
* @desc  retrun current user
* @access private
* */

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    const {name, email, id} = req.user;
    res.json({
        message: 'success',
        user: {id, name, email}
    })
});


module.exports = router;