
exports.up = function(knex) {
    return knex.schema
        .createTable('inputs', function (table) {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.integer('type').notNullable();
            table.string('company', 255).notNullable();
            table.string('ip', 255).notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("inputs");
};