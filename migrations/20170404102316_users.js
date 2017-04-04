"use strict";

exports.up = (knex, Promise) => {
    return knex.schema.createTable("users", (table) => {
        table.increments()
            .primary();
        table.string("full_name")
            .notNullable()
            .defaultTo('');
        table.string("username")
            .notNullable()
            .defaultTo('');
        table.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.raw('now()'));
        table.timestamp('updated_at')
            .notNullable()
            .defaultTo(knex.raw('now()'));
    })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
