const express = require('express');
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExpInput = require('../../validation/experience');
const validateEduInput = require('../../validation/education');

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
    Profile.find()
    // .populate("User", ['name', 'avatar'])
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
        .populate("User", ["name", "avatar"])
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
        .populate("User", ["name", "avatar"])
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
        .populate("User", ['name', "avatar"])
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
    const {errors, isValid} = validateProfileInput(req.body);

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

//@route post api/profile/experience
//@desc add an experience
// private
router.post('/experience', passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isValid} = validateExpInput(req.body);
    if (!isValid) {
        return res.status(400).json({errors})
    }

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (profile) {
                const newExp = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }
                // add to experiance array
                profile.experience.unshift(newExp);
                profile.save()
                    .then(profile => {
                        res.status(200)
                            .json({profile: profile})
                    })
            }
        })
});

//@route post api/profile/education
//@desc add an experience
// private
router.post('/education', passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isValid} = validateEduInput(req.body);
    if (!isValid) {
        return res.status(400).json({errors})
    }

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (profile) {
                const newEdu = {
                    school: req.body.school,
                    degree: req.body.degree,
                    fieldOfStudy: req.body.fieldOfStudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }
                // add to experiance array
                profile.education.unshift(newEdu);
                profile.save()
                    .then(profile => {
                        res.status(200)
                            .json({profile: profile})
                    })
            }
        })
});


//@route delete api/profile/experience/:exp_id
//@desc delete an experience
// private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const exp_id = req.params.exp_id;
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const removeIndex = profile.experience.map(item => item.id)
                .indexOf(exp_id);
            // item exists

            if (removeIndex >= 0) {
                profile.experience = profile.experience.filter(exp => exp.id !== exp_id);
                profile.save()
                    .then(profile => res.status(200).json({
                        message: 'profile updated',
                        profile: profile
                    }))
                    .catch(err => res.status(400).json({errors: "failed to update the profile"}))
            } else {
                res.status(404)
                    .json({
                        message: 'experience dosn\'t exist'
                    })
            }
        })

})


//@route delete api/profile/education/:exp_id
//@desc add an education
// private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const edu_id = req.params.edu_id;
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const removeIndex = profile.education.map(item => item.id)
                .indexOf(edu_id);
            // item exists?
            if (removeIndex >= 0) {
                profile.education = profile.education.filter(edu => edu.id !== edu_id);
                profile.save()
                    .then(profile => res.status(200).json({
                        message: 'profile updated',
                        profile: profile
                    }))
                    .catch(err => res.status(400).json({errors: "failed to update the profile"}))
            } else {
                res.status(404)
                    .json({
                        message: 'education  dosn\'t exist'
                    })
            }
        })

})
//@route delete api/profile/
//@desc delte user and profile
// private

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({user: req.user.id})
        .then(profile => {
            if (profile) {
                return User.findOneAndRemove({_id: req.user.id})
                    .then(_ => res.status(200).json({
                        message: "user deleted"
                    }))
            } else {
                res.status(400).json({message: 'failed to delete '})
            }
        }).catch(_ => res.status(400).json({message: 'failed to delete '}))

})

module.exports = router;