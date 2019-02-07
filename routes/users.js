const express = require('express');
const router = express.Router();
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
    if(!name || !email || !password || !password2){
        errors.push({msg: 'please fill in all fields'});
    }

    if(password !== password2){
        errors.push({msg: 'passwords do not match'})

    }
    if(password.length < 6){
        errors.push({msg: 'Password should be at least 6 charecters'})
    }
    if(name.length < 3){
        errors.push({msg: 'Name should be at least 3 charecters'})
    }


    if(errors.length > 0){
        console.log('there are errors')
        res.render('register',{

            errors,
            name,
            email,
            password,
            password2

        });


    }
    else{
        res.send('pass');
    }

})

module.exports = router;
