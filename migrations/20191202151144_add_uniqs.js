
exports.up = function(knex) {
    return knex.schema
        .createTable('uniqs', function (table) {
            table.increments('id');
            table.string('T', 50).notNullable();
            table.integer('S').unsigned();
            table.string('C', 50).notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("uniqs");
};
