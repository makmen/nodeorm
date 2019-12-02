
exports.up = function(knex) {
    return knex.schema
        .createTable('tscs', function (table) {
            table.increments('id');
            table.string('Tu', 50).notNullable();
            table.bigInteger('Su').unsigned();
            table.string('T', 50).notNullable();
            table.integer('S').unsigned();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("tscs");
};
