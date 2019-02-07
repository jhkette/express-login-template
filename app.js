const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');




const app = express();

//connect to db
const db = require('./config/keys').MongoURI;

mongoose.connect(db, {userNewUrlParser: true})
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

//body parser
app.use(express.urlencoded({extended: false}));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`server started on port ${PORT}`));
