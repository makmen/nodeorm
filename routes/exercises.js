var express = require('express');
var router = express.Router();
var faker = require('faker');
var Exercise = require('../Models/exercise');

router.get('/create', function (req, res) {

    const saveExercise = async () => {
        var object = {
            title: faker.commerce.product(),
            number: faker.random.number(),
            description: faker.lorem.paragraphs()
        };
        return await Exercise.create(object);
    };
    saveExercise().then(exercise => {
        res.status(200).send(exercise);
    }).catch(err => {
        res.status(201).send('error ');
    });
});

router.get('/view/:id', function (req, res) {
    var id = req.params['id'];
    const findExercise = async () => {
        return await Exercise.find(id);
    };
    findExercise().then(exercise => {
        res.status(200).send(exercise);
    }).catch(err => {
        res.status(201).send('error ');
    });
});

module.exports = router;
