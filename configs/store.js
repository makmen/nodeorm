var Store = require('openrecord/store/mysql');

var store = new Store({
    host: 'localhost',
    database : 'markers',
    user: 'root',
    password: 'root',
    autoLoad: true,

    models: [
        require('../Models/exercise.js'),
        require('../Models/input.js'),
        require('../Models/workout.js'),
        require('../Models/uniq.js'),
        require('../Models/tsc.js'),
    ]
});
console.log(store.config)

async function openDB() {
    await store.connect();
    await store.ready();
    console.log('connected');
}
openDB();

module.exports = store;