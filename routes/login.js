const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const user = require('../models/user')

router.get("/", function (req, res, next) {
    res.render('login');
})

router.post('/',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    function (req, res, next) {
        res.redirect('/');
});
//Log out
router.get('/logout', function(req, res, next){
    req.logout();
	res.redirect('/');
});
passport.use(new LocalStrategy(
    function(username, password, done){
        user.authenticateUser(username, password, function(error, result){
            if(result){
                return done(null, result)
            }
            if(!result){
                return done(null, false, {message: 'Invalid username and/or password.'})
            }
        })
    }
));

module.exports = router;
