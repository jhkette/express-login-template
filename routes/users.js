const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
//login
router.get('/login', (req, res) => res.render('login'));
//register
router.get('/register', (req, res) => res.render('register'));


router.post('/register', (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: 'please fill in all fields'
        });
    }

    if (password !== password2) {
        errors.push({
            msg: 'passwords do not match'
        })

    }
    if (password.length < 6) {
        errors.push({
            msg: 'Password should be at least 6 charecters'
        })
    }
    if (name.length < 3) {
        errors.push({
            msg: 'Name should be at least 3 charecters'
        })
    }
    if (errors.length > 0) {
        console.log('there are errors')
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });


    } else {
        User.findOne({email: email})
        .then(user =>{
            if(user){
                // user exists
                errors.push({msg: 'email is already in use'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else{
                const newUser = new User ({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10,(err, salt)=>
                  bcrypt.hash(newUser.password, salt, (err, hash) =>{
                      newUser.password = hash;
                      newUser.save()
                          .then(user =>{
                              console.log(newUser);
                              req.flash('success_msg', 'you are now registered and can log in');
                               res.redirect('/users/login');
                          })
                           .catch(err => console.log(err));
                  }))
            }
        })
    }

})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;
