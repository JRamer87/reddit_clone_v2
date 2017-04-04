"use strict";

exports.up = (knex, Promise) => {
    return knex.schema.createTable("posts", (table) => {
        table.increments()
            .primary();
        table.string("title")
            .notNullable()
            .defaultTo('');
        table.string("body")
            .notNullable()
            .defaultTo('');
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index();
        table.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.raw('now()'));
        table.timestamp('updated_at')
            .notNullable()
            .defaultTo(knex.raw('now()'));
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
