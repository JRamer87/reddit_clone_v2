"use strict";

exports.seed = (knex) => {
    return knex('posts')
        //Deletes all the entries
        .del()
        .then(() => {
            // Inserts seed entries
            return knex('posts')
                .insert([{
                        title: 'Coffee is Amazing',
                        body: 'I love coffee so much',
                        user_id: 6
                    },
                    {
                        title: 'Jed is the Best',
                        body: 'Because he rides bikes',
                        user_id: 1
                    },
                    {
                        title: 'Noni is cool',
                        body: 'Because he smokes pipes',
                        user_id: 2
                    },
                    {
                        title: 'Adrian is cool',
                        body: 'Because he is funny',
                        user_id: 3
                    },
                    {
                        title: 'James is cool',
                        body: 'Because he lives by Alamo Drafthouse',
                        user_id: 4
                    },
                    {
                        title: 'Shahzad is cool',
                        body: 'Because he is from Houston',
                        user_id: 5
                    }
                ]);
        });
};
