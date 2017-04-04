"use strict";

exports.seed = (knex) => {
    return knex('users')
        //Deletes all the entries
        .del()
        .then(() => {
            // Inserts seed entries
            return knex('users')
                .insert([{
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
