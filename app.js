const express = require('express');
const app = express();
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const config = require('config');

app.use(express.static(path.join(__dirname, 'static')))

//Routes
const homepage = require('./routes/homepage');
const login = require('./routes/login');
const register = require('./routes/register');


// const conn = mysql.createConnection({
//   host: config.get('db.host'),
//   database: config.get('db.database'),
//   user: config.get('db.user'),
//   password: config.get('db.password')
// })

//Body Parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//View Engine
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

//Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave:true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
})
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', homepage);
app.use('/login', login);
app.use('/register', register);
app.use('/post', homepage);
app.use('/delete', homepage);
app.use('/like', homepage);
app.get('/logout', function(req, res, next){
  console.log('inside this logout')
  req.logout();
  res.redirect('/');
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
