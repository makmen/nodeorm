var express = require('express');
var router = express.Router();
var faker = require('faker');
var Workout = require('../Models/workout');
var Exercise = require('../Models/exercise');
var Input = require('../Models/input');
var Uniq = require('../Models/uniq');
var TSC = require('../Models/tsc');
var GApi = require('../libs/gunit');

router.get('/create', function (req, res) {
    const saveWorkout = async () => {
        var object = {
            title: faker.commerce.product(),
            number: faker.random.number(),
            company: faker.company.companyName()
        };
        return await Workout.create(object);
    };
    saveWorkout().then(workout => {
        res.status(200).send(workout);
    }).catch(err => {
        res.status(201).send('error ');
    });
});

router.get('/edit/:id', function (req, res) {
    var id = req.params['id'];

    let Tu = 'workout';
    let GUnit = 'group_input';
    let T = 'input';
    async function sequence() {
        let entity = await Workout.find(id);
        let items = await GApi.getChildren(Tu, entity[GUnit], T);

        let newItems = [
            {Tu: 'workout', Su: 9, T: 'input', S: 5},
            {Tu: 'workout', Su: 9, T: 'input', S: 2},
            {Tu: 'workout', Su: 9, T: 'input', S: 3}
        ];

        let tscArray = [];
        newItems.forEach(function(item){
            tscArray.push(TSC.new(item));
        });


        let union = GApi.union(items, tscArray);
        // let difference = GApi.difference(items, tscArray);
        let difference = GApi.difference(tscArray, items);
        let intersect = GApi.intersect(items, tscArray);


        return { entity, items, union, difference, intersect};
    }

    var error = false;
    sequence().then(process => {
        // console.log(process.entity);
        // console.log(process.items);
        // console.log(process.un);
        console.log(process.union);
        console.log(process.difference);
        console.log(process.intersect);
        res.status(200).send(process.items);
    }).catch(err => {
        console.log(err)
        error = true;
    });

    // GApi.union();
    // res.status(200).send(122);


    // const saveWorkout = async () => {
    //     var object = {
    //         title: faker.commerce.product(),
    //         number: faker.random.number(),
    //         company: faker.company.companyName()
    //     };
    //     // return await Workout.create(object);
    // };
    // saveWorkout().then(workout => {
    //     res.status(200).send(workout);
    // }).catch(err => {
    //     res.status(201).send('error ');
    // });
});

function addUniq(T, S, C) {
    var object = {
        T: T, S: S, C: C
    };

    // let uniq = await Workout.find(workoutId);

    return Uniq.create(object);
}

router.get('/ginput/save/:id', function (req, res) {
    let id = req.params.id;
    if (id === undefined) {
        throw undefined;
    }

    let T = 'input';

    let TUnit = 'workout';
    let GUnit = 'group_input';

    let inputIds = [2];

    async function sequence() {
        let entity = await Workout.find(id);
        let units = await Input.get(inputIds);

        // create uniq ID in all base
        let uniq = await Uniq.where({T: TUnit, S: entity.id, C: GUnit }).first();
        if (uniq === undefined) {
            uniq = await addUniq(TUnit, entity.id, GUnit);
        }

        // save uniq ID in group
        if (entity[GUnit] !== uniq.id) {
            entity[GUnit] = uniq.id;
            await entity.save();
        }

        let tscArray = [];
        units.forEach(function(item){
            tscArray.push(TSC.new({Tu: TUnit, Su: uniq.id, T: T, S: item.id}));
        });

        let tsc = await TSC.where({ Tu: TUnit, Su: uniq.id });
        if (!tsc.length) {
            tsc = await TSC.create(tscArray);
        } else {
            // console.log(tsc);
            // console.log(tscArray);

            // let difference = GApi.difference(tscArray, tsc);
            let intersect = GApi.intersect(tscArray, tsc);
            console.log(intersect);
            let difference = GApi.difference(tsc, tscArray);
            if (difference.length) {
                console.log(difference);
                console.log(difference.length);
            }

        }

        return { entity, units, uniq, tsc };
    }

    var error = false;
    sequence().then(process => {
        // console.log(process.entity);
        // console.log(process.units);
        // console.log(process.uniq);
        // console.log(process.tsc);
    }).catch(err => {
        console.log(err)
        error = true;
    });


    res.status(201).send('norm ');
});

router.get('/gexercise/save/:id', function (req, res) {

    let workoutId = req.params.id;
    if (workoutId === undefined) {
        throw undefined;
    }

    let T = 'exercise';
    let TUnit = 'workout';
    let GUnit = 'group_exercise';

    let exercisesIds = [3, 1, 4];

    async function sequence() {
        let workout = await Workout.find(workoutId);
        let exercises =  await Exercise.get(exercisesIds);

        // create uniq ID in all base
        let uniq = await Uniq.where({T: TUnit, S: workout.id, C: GUnit }).first();
        if (uniq === undefined) {
            uniq = await addUniq(T, workout.id, GUnit);
        }

        // save uniq ID in group
        workout.group_exercise = uniq.id;
        await workout.save();

        let tscArray = [];
        exercises.forEach(function(item){
            tscArray.push(TSC.new({Tu: TUnit, Su: uniq.id, T: T, S: item.id}));
        });
        let tsc = await TSC.where({Tu: TUnit, Su: uniq.id });
        if (!tsc.length) {
            tsc = await TSC.create(tscArray);
        }

        return { workout, exercises, uniq, tsc };
    }

    var error = false;
    sequence().then(process => {
        // console.log(process.workout);
        // console.log(process.exercises);
        // console.log(process.uniq);
        console.log(process.tsc);
    }).catch(err => {
        console.log(err)
        error = true;
    });
    // async function findWorkout() {
    //     return await Workout.find(workoutId);
    // }
    // async function findExercises() {
    //     return await Exercise.get(exercisesIds);
    // }
    // function isys() {
    //     return new Promise((res, rej) => {
    //         res(11);
    //     });
    // }
    // async function newUniq() {
    //     console.log(process);
    //     let a =  await isys();
    //     return a;
    // }
    //
    //
    //
    // findWorkout().then(workout => {
    //     console.log(111)
    //     process.workout = workout;
    //
    // }).catch(err => {
    //     error = true;
    // });
    //
    // findExercises().then(exercises => {
    //     console.log(222)
    //     process.exercises = exercises;
    // }).catch(err => {
    //     error = true;
    // });
    //
    // newUniq().then(uniq => {
    //     console.log(333)
    //     process.uniq = uniq;
    // }).catch(err => {
    //     error = true;
    // });


    // let uniq = new Promise(function(resolve, reject){
    //     // create  Uniq
    //
    // });




    // Promise.all([findWorkout, findExercises]).then(
    //     function(result) {
    //         /* обработает успешное выполнение */
    //         console.log(result);
    //         },
    //     function(error) {
    //         /* обработает ошибку */
    //         console.log(error);
    //         console.log(11)
    //     }
    // );

    //
    // console.log(a.workout)


    // const findWokrout = async () => {
    //     let workout = await Workout.find(workoutId);
    //
    //     return workout;
    // };



    // let findWorkout = new Promise(function(resolve, reject){
    //     let workout = Workout.find(workoutId);
    //     resolve(workout);
    //     // resolve(123);
    // });
    //
    // let exercisesIds = [2, 6, 7];
    // let findExercises = new Promise(function(resolve, reject){
    //     let exercises = Exercise.get(exercisesIds);
    //     resolve(exercises);
    // });

    // let uniq = new Promise(function(resolve, reject){
    //     // create  Uniq
    //
    // });
    //
    // let updateWorkout = new Promise(function(resolve, reject){
    //     // updateWorkout with uniq id
    //
    // });
    //
    // let tsc = new Promise(function(resolve, reject){
    //
    // });

    // , uniq, updateWorkout, tsc
    // Promise.all([findWorkout, findExercises]).then(
    //     function(result) {
    //         /* обработает успешное выполнение */
    //         console.log(result);
    //         },
    //     function(error) {
    //         /* обработает ошибку */
    //         console.log(error);
    //         console.log(11)
    //     }
    // );


    // const findEntity = async () => {
    //     return await Workout.find(id);
    // };
    //
    // Promise.all([cat, goods]).then(function(value){
    //     res.render('categories/cat', {
    //         cat: JSON.parse(JSON.stringify(value[0])),
    //         goods : JSON.parse(JSON.stringify(value[1]))
    //     });
    // })
    //
    // findWokrout().then(workout => {
    //     // console.log(111);
    //     // console.log(workout);
    //     res.status(200).send(workout);
    // }).catch(err => {
    //     res.status(201).send('error ');
    // });
    //
    // const saveWorkout = async () => {
    //     var object = {
    //         title: faker.commerce.product(),
    //         number: faker.random.number(),
    //         company: faker.company.companyName()
    //     };
    //     // return await Workout.create(object);
    // };
    // saveWorkout().then(workout => {
    //     res.status(200).send(workout);
    // }).catch(err => {
    //     res.status(201).send('error ');
    // });

    res.status(201).send('error ');
});

router.get('/view/:id', function (req, res) {
    var id = req.params['id'];
    const findWokrout = async () => {
        return await Workout.find(id);
    };
    findWokrout().then(workout => {
        // console.log(111);
        // console.log(workout);
        res.status(200).send(workout);
    }).catch(err => {
        res.status(201).send('error ');
    });
});

router.get('/', function (req, res) {

    // var a = faker.random.number();
    //
    // const saveWorkout = async () => {
    //     var object = {
    //         title: faker.commerce.product(),
    //         // number: faker.random.number(),
    //         // company: faker.company.companyName()
    //     };
    //     return await Workout.create(object);
    // };
    // saveWorkout().then(workout => {
    //     res.status(200).send('good ' + workout.id );
    // }).catch(err => {
    //     res.status(201).send('error ');
    // });

    // var promise = new Promise(function(resolve, reject) {
    //     var object = {
    //         title: faker.commerce.product(),
    //         number: faker.random.number(),
    //         company: faker.company.companyName()
    //     };
    //     var workout = Workout.create(object);
    //     if (workout.id == undefined) {
    //         reject('workout error creating');
    //     }
    //     resolve(workout);
    // }).then(function (entity) {
    //     res.status(200).send('good ' + entity.id );
    // }).catch(function (error) {
    //     res.status(201).send('error ' + a );
    // });
    //




    // var promise = new Promise(function(resolve, reject) {
    //     // reject('error creating');
    //     var ew = 1;
    // }).then(results => {
    //     res.status(200).send('good ' + a );
    // }).catch(error => {
    //     res.status(201).send('error ' + a );
    // });




    // new Promise(function(resolve, reject){
    //     var object = {
    //         title: faker.commerce.product(),
    //         number: faker.random.number(),
    //         company: faker.company.companyName()
    //     };
    //     reject('error creating');
    //     // var workout = Workout.create(object);
    //     // if (workout.id == undefined) {
    //     //     reject('error creating');
    //     // }
    //
    // }).then(function(value){
    //     console.log(value);
    //     res.status(201).send('get get ' + a );
    //     // res.render('categories/cat', {
    //     //     cat: JSON.parse(JSON.stringify(value[0])),
    //     //     goods : JSON.parse(JSON.stringify(value[1]))
    //     // });
    // });



    console.log(a);

    // const workout = await Workout.create({
    //     title: faker.commerce.product(),
    //     number: faker.random.number,
    //     company: faker.commerce.company,
    // });
    // console.log(workout.id);

    //
    // new Promise(function(resolve, reject){
    //
    //     Workout.create({
    //         title: faker.commerce.product(),
    //         number: faker.random.number,
    //         company: faker.commerce.company,
    //     });
    // }).then(function(value){
    //     console.log(value);
    //     res.status(201).send('get get ' + a );
    //     // res.render('categories/cat', {
    //     //     cat: JSON.parse(JSON.stringify(value[0])),
    //     //     goods : JSON.parse(JSON.stringify(value[1]))
    //     // });
    // });


});


module.exports = router;
