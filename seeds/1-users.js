"use strict";
//Defining what happens when you run the knex seed:run command
exports.seed = (knex) => {
    //Selecting everything from the users table
    return knex('users')
        //Deleting everything from the users table that way it's empty before we run the seed.  Otherwise we will have duplicate data.
        .del()
        .then(() => {
            // Selecting everything from the users table
            return knex('users')
                //Inserting a bunch of seed data into the users table
                .insert([{
                        //Next two lines are assigning values for each column in the users table
                        full_name: 'Jon Ramer',
                        username: 'jramer'
                    },
                    {
                        full_name: 'Jed Bertram',
                        username: 'jbertram'
                    },
                    {
                        full_name: 'Noni Manzano',
                        username: 'nmanzano'
                    },
                    {
                        full_name: 'Adrian Thomas',
                        username: 'athomas'
                    },
                    {
                        full_name: 'James Proet',
                        username: 'jproet'
                    },
                    {
                        full_name: 'Shahzad Khan',
                        username: 'skhan'
                    }
                ]);
        });
};
