const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// user model
const User = require('../../models/User');
const router = express.Router();

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
    User.findOne({email: req.body.email})
    // it will always return [] or [{},{}] with users
        .then(doc => {
            if (doc) {
                return res.status(400)
                    .json({
                        email: "Email already exists"
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
    const {email, password} = req.body;
    // find the uer by email
    User.findOne({email})
        .then(user => {
            // if user is there

            if (!user) {
                return res.status(404)
                    .json({
                        message: "Email not found"
                    })
            }
            // check the password

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.status(200)
                            .json({
                                message: "login success"
                            })
                    } else {
                        return res.status(400)
                            .json({message: "password incorrect"})
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

module.exports = router;