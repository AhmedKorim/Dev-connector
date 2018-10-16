const express = require('express');
const passport = require('passport');
const validateeProfileInput = require('../../validation/profile');

// models
// => User
const User = require('../../models/User');
// => Profile
const Profile = require('../../models/Profile');

// init router
const router = express.Router();
router.get('/current', (req, res, next) => {
    res.json({
        message: "profile works"
    })
});

//@route post api/profile/handle/:handle
//@desc get all profiles
// public

router.get('/all', (req, res, next) => {
    const errors = {};
    Profile.find({})
        .populate("User", ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.profiles = "no profiles found";
                return res.status(404)
                    .json({
                        errors
                    })
            }
            res.status(200).json({
                profiles: profiles
            })
        }).catch(_ => {
        errors.profiles = "no profiles found";
        return res.status(404)
            .json({
                errors
            })
    })
})


//@route post api/profile/handle/:handle
//@desc get profile by handle
// public

router.get("/handle/:handle", (req, res, next) => {

    const {handle} = req.params;
    const errors = {};
    Profile.findOne({handle})
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                error.noProfile = "there is no profile found"
                return res.status(404).json({
                    errors
                })
            }
            res.status(200)
                .json({
                    handle: handle,
                    profile: profile
                })
        }).catch(err => res.status(500).json({errors: err}))
});


//@route post api/profile/user/:user_id
//@desc get profile by handle
// public

router.get("/user/:user_id", (req, res, next) => {
    const {user_id} = req.params;
    const errors = {};
    Profile.findOne({user: user_id})
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                error.noProfile = "there is no profile found"
                return res.status(404).json({
                    errors
                })
            }
            res.status(200)
                .json({
                    handle: handle,
                    profile: profile
                })
        }).catch(err => {
        errors.profile = " there is no profile for this user"
        return res.status(500).json({errors: errors});
    })
});


//@route get api/profile
router.get('/', passport.authenticate("jwt", {session: false}), (req, res, next) => {
    const user = req.user;
    const errors = {};
    Profile.findOne({user: user.id})
        .populate("user", ['name', "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noProfile = "there is no profile for this user";
                return res.status(404)
                    .json(errors)
            }
            res.json({profile})
        })
        .catch(err => {
            res.status(500)
                .json({error: err})
        })
})


//@route post api/profile
//@desc create or edit user router
// protected

router.post('/', passport.authenticate("jwt", {session: false}), (req, res, next) => {
    //getting all fields
    const profileFields = {}
    const {errors, isValid} = validateeProfileInput(req.body);

    if (!isValid) {
        return res.status(400)
            .json(errors)
    }
    profileFields.user = req.user.id;
    const {
        handle,
        company,
        website,
        location,
        bio,
        status,
        githubUsername,
        skills,
        youtube,
        twitter,
        facebook,
        instagram,
    } = req.body;

    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    // skills array
    if (skills) profileFields.skills = skills.split(",");
    // social links
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    Profile.findOne({user: req.user.id})
        .then(profile => {

            if (profile) {
                Profile.findOneAndUpdate({user: req.user.id},
                    {$set: profileFields},
                    {new: true})
                    .then(profile => res.json(profile))
            } else {
                // create
                // handle check
                Profile.find({handle: profileFields.handle})
                    .then(profile => {
                        if (profile[0]) {
                            errors.handle = "handle is already exits"
                            return res.status(400)
                                .json(errors)
                        }
                        // new profile
                        new Profile(profileFields)
                            .save()
                            .then(profile => {
                                return res.status(200).json(profile);
                            })
                            .catch(err => res.json(err))
                    })
            }
        })

})


module.exports = router;