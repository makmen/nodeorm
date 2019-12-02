var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        database : 'markers',
        user: 'root',
        password: 'root',
    }
});

module.exports = knex;