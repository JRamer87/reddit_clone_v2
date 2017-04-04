"use strict";

exports.seed = (knex) => {
    return knex('comments')
        //Deletes all the entries
        .del()
        .then(() => {
            // Inserts seed entries
            return knex('comments')
                .insert([{
                        id: 1,
                        body: 'Houston is awesome',
                        post_id: 6
                    },
                    {
                        id: 2,
                        body: 'Coffee keeps me awake',
                        post_id: 1
                    },
                    {
                        id: 3,
                        body: 'He just got a sweet new bike',
                        post_id: 2
                    },
                    {
                        id: 4,
                        body: 'He thinks I am going on a hike with him.',
                        post_id: 3
                    },
                    {
                        id: 5,
                        body: 'That dude is trippin',
                        post_id: 4
                    },
                    {
                        id: 6,
                        body: '713 Baby',
                        post_id: 5
                    }
                ]);
        });
};
