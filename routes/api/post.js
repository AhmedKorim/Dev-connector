const express = require('express');
const Post = require('../../models/Post');
const passport = require('passport');
// init router
const router = express.Router();
router.get('/test', (req, res, next) => {
    res.json({
        message: "post works"
    })
});
// validation
const postInputValidation = require('../../validation/post');


// @route post api/posts/:id
// create post
// public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                return res.status(200)
                    .json({
                        posts: post
                    })
            } else {
                res.status(404)
                    .json({
                        error: 'post not not found'
                    })
            }


        })
        .catch(_ => res.status(404).json({error: "post found"}))
})


// @route post api/posts
// create post
// public
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => {
            res.status(200)
                .json({
                    posts: posts
                })
        })
        .catch(_ => res.status(404).json({error: "no posts found"}))
})


// @route post api/posts
// create post
// private
router.post("/", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {_id, avatar, name} = req.user;
    const {isValid, errors} = postInputValidation(req.body);
    if (!isValid) return res.status(400).json({
        errors: errors
    })
    // TODO : get name and avatar from auth

    const newPost = new Post({
        text: req.body.text,
        name: name,
        avatar: avatar,
        user: _id
    })
    newPost.save()
        .then(post => res.status(200).json({post: post}))
        .catch(_ => {
            errors.post = "failed to add Post";
            console.log(_);
            return res.status(500).json({error: errors});
        })


})

// @route delete api/posts
// create post
// public
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Todo check the id from passport and the id from the post
    Post.findById(req.params.id)
        .then(post => {
            if (post.user.toString() === req.user.id) {
                return post.remove()
                    .then(post => {
                        res.status(200)
                            .json({
                                posts: post
                            })
                    })
            } else {
                res.status(401).json({error: "you aren't authorized to do this action"})
            }
        }).catch(_ => res.status(404).json({error: "no posts found"}))


})

// @route delete api/posts/like/:id
// add like post
// public

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Todo check the id from passport and the id from the post
    Post.findById(req.params.id)
        .then(post => {
            // is user post ?
            if (post.user.toString() === req.user.id) {
                return res.status(400)
                    .json({
                        error: "you cant like your own posts"
                    })
                // has a like already? toggle it
            } else if (post.likes.find(post => post.user.toString() === req.user.id)) {
                post.likes = post.likes.filter(post => post.user.toString() !== req.user.id);
                return post.save().then(post => res.status(200).json({
                    message: "like removed",
                    post
                }))
            }
            post.likes.unshift({user: req.user.id})
            return post.save().then(post => res.status(200).json({
                message: "like added",
                post
            }))
        }).catch(_ => res.status(404).json({error: "no posts found"}))
})


// @route add comment api/posts/comment/:id
// add comment post
// public
router.post('/comment/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
    const {avatar, name, id} = req.user;
    const {errors, isValid} = postInputValidation(req.body);
    if (!isValid) {
        return res.status(401)
            .json({
                errors
            })
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                avatar, name,
                user: id
            }

            // add to commments array
            post.comments.unshift(newComment)
            return post.save()
                .then(post => {
                    res.status(200)
                        .json({
                            post
                        })
                })
                .catch(err => console.log(err))
        }).catch(_ => res.status(404).json({
        error: "no post found"
    }))
})

// @route add comment api/posts/comment/:id
// add comment post
// public
router.delete("/comment/:post_id/:comment_id", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {post_id, comment_id} = req.params;
    Post.findById(post_id)
        .then(post => {
            // is this comment there ?
            if (post.comments.find(comment => comment._id.toString() === comment_id)) {
                post.comments = post.comments.filter(comment => comment._id.toString() !== comment_id);
                return post.save()
                    .then(comment => res.status(200).json({
                        message: "comment deleted",
                        comment
                    }))
            } else {
                res.status(404).json({error: "comment is not there"})
            }
        })
        .catch(_ => {
            console.log(_);
            res.status(404).json({error: "comment is not there"})
        })
})
module.exports = router;