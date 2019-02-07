const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//pasport config
require('./config/passport')(passport);


const app = express();

//connect to db
const db = require('./config/keys').MongoURI;

mongoose.connect(db, {userNewUrlParser: true})
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

//body parser
app.use(express.urlencoded({extended: false}));


//express session middleware

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`server started on port ${PORT}`));
