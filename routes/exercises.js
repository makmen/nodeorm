var express = require('express');
var router = express.Router();
var faker = require('faker');
var Exercise = require('../Models/exercise');
var fs = require('fs');
var GApi = require('../libs/gunit');


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

router.get('/view/:id', async function (req, res) {
    // // Get content from file
    // var contents = fs.readFileSync('./markers/markers_root.json');
    // // Define to JSON type
    // var jsonContent = JSON.parse(contents);
    // console.log(1111);
    console.log('s');

    var a = await GApi.testFunc();
    console.log(a);
    console.log('f');



    // a.then(
    //     function(result) {
    //         /!* обработает успешное выполнение *!/
    //         console.log(111);
    //         res.status(200).send(result);
    //     },
    //     function(error) {
    //         /!* обработает ошибку *!/
    //         console.log(222);
    //         return error;
    //     }
    // );

    res.status(200).send(a);

    // var id = req.params['id'];
    // const findExercise = async () => {
    //     return await Exercise.find(id);
    // };
    // findExercise().then(exercise => {
    //     res.status(200).send(exercise);
    // }).catch(err => {
    //     res.status(201).send('error ');
    // });
});

module.exports = router;
