var express = require('express');
var router = express.Router();
var User = require('../Models/user');
var faker = require('faker');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var passport = require('passport')

// router.use(passport.authenticate('jwt', {session: false}));

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login', {});
});

/* GET users listing. */
router.get('/create', async function(req, res, next) {

    var token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImxvZ2luIjoiTmVpbDc4IiwicGFzc3dvcmQiOiIkMmEkMTAkdXNVUEV3OHQxUzQ4UEpRZFFTSFBmT0x2L3R3ZnZIVXQ1bnhqNWxjdWcvc3JRNFpVV0FVbGkiLCJlbWFpbCI6IkxlbGFuZF9CYXNoaXJpYW5AaG90bWFpbC5jb20iLCJpYXQiOjE1NzUzNjI1NTcsImV4cCI6MTU3NTQ0ODk1N30.iMLFayHfpniCGNjEzJHZsONY7BQ56lVC77WJC17s7I0';

    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        console.log(err);
        console.log(user);
        console.log(info);
        // if (err || !user) {
        //     return res.status(400).json({
        //         message: info ? info.message : 'Login failed',
        //         user   : user
        //     });
        // }
        //
        // req.login(user, {session: false}, (err) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //
        //     const token = jwt.sign(user 'your_jwt_secret');
        //
        //     return res.json({user, token});
        // });
    })
    (req, res);


    // var object = {
    //     login: faker.internet.userName(),
    //     email: faker.internet.email(),
    //     password: 111
    // };
    //
    // const saltRounds = 10;
    // object.password = bcrypt.hashSync(
    //     object.password,
    //     bcrypt.genSaltSync(saltRounds)
    // );
    // let user = await User.create(object);

    // res.status(200).send({user: user});
    res.status(200).send({token: token});
});

router.post('/login', async function(req, res, next) {
    let user = await User.where({login: req.body.login }).first();
    if (user !== undefined) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            console.log(user)
            var token = jwt.sign(user.toJwtObject(), 'secret-word', {expiresIn: '1d'});
            console.log(token);

            res.status(200).send({user: user, token: token});
        } else {
            res.status(201).send('Access denied');
        }
    } else {
        res.status(201).send('Access denied');
    }
});

module.exports = router;
