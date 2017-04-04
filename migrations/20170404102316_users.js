"use strict";
//Defining what happens when you run the knex migrate:latest
exports.up = (knex, Promise) => {
    //Creating a users table
    return knex.schema.createTable("users", (table) => {
        //Assigning auto incrementing ids to the table
        table.increments()
            //Setting the id column as the primary key on the table
            .primary();
        //Creating a full_name column with a data type of varchar 255 on our table
        table.string("full_name")
            //Adding a Not Null constraint to the full_name column
            .notNullable()
            //Adding a constraint that will add a default value of '' to the column if no value is passed in when a record is added
            .defaultTo('');
        //Creating a username column with a data type of varchar 255 on the users table
        table.string("username")
            //Adding a Not Null constraing to the username column
            .notNullable()
            //Adding a constraint that will add a default value of '' to the column if no value is passed in when a record is added
            .defaultTo('');
        //Creating a timestamp for when the record was created
        table.timestamp('created_at')
            //Adding a Not Null constraint to the column
            .notNullable()
            //Using knex.raw to default the value of this column to the current time
            .defaultTo(knex.raw('now()'));
        //Creating a timestamp for when the record was updated
        table.timestamp('updated_at')
            //Adding a Not Null constraint to the column
            .notNullable()
            //Using knex.raw to default the value of this column to the current time
            .defaultTo(knex.raw('now()'));
    })
};
//Defining what happens when you run the knex:migrate rollback command
exports.down = (knex, Promise) => {
    //Dropping the users table from the database
    return knex.schema.dropTable('users');
};
