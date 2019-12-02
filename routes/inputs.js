var express = require('express');
var router = express.Router();
var faker = require('faker');
var Input = require('../Models/input');

router.get('/create', function (req, res) {
    const saveInput = async () => {
        var object = {
            title: faker.commerce.product(),
            type: faker.random.number(),
            company: faker.company.companyName(),
            ip: faker.internet.ip()
        };
        return await Input.create(object);
    };
    saveInput().then(input => {
        res.status(200).send(input);
    }).catch(err => {
        res.status(201).send(err);
    });
});

router.get('/view/:id', function (req, res) {
    var id = req.params['id'];
    const findInput = async () => {
        return await Input.find(id);
    };
    findInput().then(input => {
        res.status(200).send(input);
    }).catch(err => {
        res.status(201).send('error ');
    });
});

module.exports = router;
