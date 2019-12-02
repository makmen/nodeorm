var express = require('express');
var router = express.Router();
var mysql = require('./../configs/mysql');
var faker = require('faker');

// 11 Меню навигации для магазина
// Injection
// Login
// Работа с ошибками

// faker.js
// https://www.npmjs.com/package/Faker

// router.use(function (req, res, next) {
//     console.log('here');
//     next();
// });
//
var logger = function (req, res, next) {
    console.info(req.params);
    next();
};


/* GET all products. */
router.get('/', function (req, res) {

    // mysql.query('SELECT * FROM goods WHERE id=' + req.query.id, function (error, result, fields) {
    //     if (error) throw error;
    //     res.render('goods/goods', { goods: JSON.parse(JSON.stringify(result)) });
    // });
});

router.get('/:id', logger, function (req, res) {

    mysql.query('SELECT * FROM goods WHERE id=' + req.params['id'], function (error, result, fields) {
        if (error) throw error;
        res.render('goods/view', { goods: JSON.parse(JSON.stringify(result)) });
    });

});

router.post('/', function (req, res) {
    // res.status(201).send(req.body);
});

router.put('/:id', function (req, res) {
    // res.status(200).send({
    //     id: req.params['id'],
    //     name: faker.commerce.product(),
    //     price: faker.commerce.price(),
    //     color: faker.commerce.color()
    // });
});

router.delete('/:id', logger, function (req, res) {
    // // 204 No Content
    // res.status(200).send({
    //     id: faker.random.number(),
    //     name: faker.commerce.product(),
    //     price: faker.commerce.price(),
    //     color: faker.commerce.color(),
    //     status: 'inactive'
    // });
});


module.exports = router;