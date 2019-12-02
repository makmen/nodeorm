exports.up = function(knex) {
    return knex.schema
        .createTable('exercises', function (table) {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.integer('number').notNullable();
            table.text('description');
            table.bigInteger('group_input').unsigned();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("exercises");
};

exports.config = { transaction: false };