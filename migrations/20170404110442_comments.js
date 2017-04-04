"use strict";

exports.up = (knex, Promise) => {
    return knex.schema.createTable("comments", (table) => {
        table.increments()
            .primary();
        table.string("body")
            .notNullable()
            .defaultTo('');
        table.integer('post_id')
            .notNullable()
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
            .index();
        table.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.raw('now()'));
        table.timestamp('updated')
            .notNullable()
            .defaultTo(knex.raw('now()'));
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('comments');
};
