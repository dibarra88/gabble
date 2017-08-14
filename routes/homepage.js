const express = require('express')
const router = express.Router()
const post = require('../models/post')

router.get("/", function (req, res, next) {
    var userId;
    if (req.user) {         //authenticated user
        userId = req.user.id
    }
    post.getAllPosts(userId, function (success, results) {
        if (success) {
            res.render('homepage', { posts: results });
        }
        else {
            console.log('Error optaining the posts', results)
        }
    })
})
// Creatig a new post
router.post('/', authenticationMiddleware(), function (req, res, next) {
    req.checkBody('gabble', "Post cannot be empty.").notEmpty();
    req.checkBody('gabble', "Post must be between 2-140 characters long.").len(2, 140);

    var errors = req.validationErrors();
    if (errors) {
        res.render('homepage', { errors: errors })
    }
    else {
        post.createPost(req.body.gabble, req.user.id, function (success, result) {
            if (success) {
                //post was created
                res.redirect('/');
            }
            else {
                console.log('Error on saving the post', result)
            }
        })
    }

})
// "deleting" post
router.post('/delete', authenticationMiddleware(), function (req, res, next) {
    post.deletePost(req.body.postId, function (success, results) {
        if (success) {
            res.redirect('/');
        }
        else {
            console.log('Error trying to set post to active = false,', error)
        }
    })
})
// Adding one like to post
router.post('/like', authenticationMiddleware(), function (req, res, next) {
    post.createLike(req.body.postId, req.user.id, function (success, result) {
        if (success) {
            //post was created
            res.redirect(req.get('referer'));
        }
        else {
            console.log('Error creating a post like', result)
        }
    })
})

router.get('/like/:id', function (req, res, next) {
    var userId;
    if (req.user) {         //authenticated user
        userId = req.user.id
    }
    post.getPostLikes(userId, req.params.id, function (success, result) {
        if (success) {
            res.render('likes', result)
        }
        else {
            res.redirect('/');
            console.log('Error retrieving post likes ', result)
        }
    })
})


function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login')
    }
}
module.exports = router;
