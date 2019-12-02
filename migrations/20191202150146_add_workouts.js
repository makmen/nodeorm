exports.up = function(knex) {
    return knex.schema
        .createTable('workouts', function (table) {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.string('company', 255).notNullable();
            table.integer('number').notNullable();
            table.bigInteger('group_exercise').unsigned();
            table.bigInteger('group_input').unsigned();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("workouts");
};

exports.config = { transaction: false };