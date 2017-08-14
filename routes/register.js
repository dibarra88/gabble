const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const user = require('../models/user');

router.get("/", function (req, res, next) {
    res.render('register');
})

router.post('/', function (req, res, next) {
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('password2', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('password2', 'Passwords do not match, please try again.').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', { errors: errors, username:req.body.username, email:req.body.email, image:req.body.image });
    }
    else {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const image = req.body.image;

        user.createUser(username, email, password, image, function (success, result) {
            if (success) {
                req.login(result, function (error) {
                    res.redirect('/');
                })
            } else {
               res.render('register', { errors:[{msg:"Username and/or email already exists."}], username:req.body.username, email:req.body.email, image:req.body.image });
            }
        })
    }
})
passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
        done(null, user_id);
});
module.exports = router;
