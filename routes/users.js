"use strict";
//Bringing in express
const express = require('express');
//Bringing in express router
const router = express.Router();
const knex = require("../db/knex");
//Defining handling for /users route
router.route("/")
    //Setting the .get method handling for /users route
    .get((req, res) => {
        //selecting everything from the users table in the database
        knex('users')
            //Passing in the results(users) from our database query
            .then((users) => {
                //Rendering the index page for users and sending the results from our database query along with it.
                res.render("users/index", {
                    //Key "users" will be available for ejs to evaluate.  Value "users" will be the results from our database call.  We can use JS to manipulate this.
                    users: users
                });
            });
    })
    //Setting the .post method handling for the /users route
    .post((req, res) => {
        //Selecting everything from the users table
        knex('users')
            //Inserting the new user.  The user in req.body.user comes from the form submission on the users/new ejs page.  We send the whole object to the database and as long as it's formatted correctly the database will add it to the table.
            .insert(req.body.user)
            //Grabbing the id that was created from creating a new user
            .returning("id")
            //Passing the id value into the .then callback function
            .then((id) => {
                //Redirecting to the /users/:user_id route with the id from the new user passed in for the :user_id
                res.redirect(`/users/${id}`);
            })
            //Error handling
            .catch((err) => {
                //Logging the error message to the server
                console.log(err);
            });
    });
//Defining a route for users/new
router.route("/new")
    //Setting the .get method handling for the /users/new route
    .get((req, res) => {
        //Rendering the users/new page to the client(browser)
        res.render("users/new");
    });
//Defining a new route for /users/edit
router.route("/edit")
    //Setting the .get method handling for the /users/edit route
    .get((req, res) => {
        //Rendering the users/edit page to the client(browser)
        res.render("users/edit");
    });
//Defining a new route for /users/delete
router.route("/delete")
    //Setting the .get method handling for /users/delete
    .get((req, res) => {
        //Rendering the users/delete page
        res.render("users/delete");
    });

//Defining a new route for /users/:user_id
router.route("/:user_id")
    //Setting the .get method handling for the /users/:user_id route
    .get((req, res) => {
        //Selecting everything from the users table
        knex('users')
            //Only selecting the records from the users table where the id matches the id being passed in on the request object from the client.  req.params.user_id comes from the url bar in the client.
            .where("id", req.params.user_id)
            //Passing in the value of the database query to a callback function
            .then((user) => {
                //Logging the users/show page so that we can see the specific user that was requested from the client
                res.render("users/show", {
                    //Passing in values that will be available to our ejs page.
                    id: user[0].id,
                    name: user[0].full_name,
                    username: user[0].username
                });
            });
    })
    //Defining the handling for the .put method on the /users/:user_id route
    .put((req, res) => {
        //Selecting everything from the users table
        knex('users')
            //Limiting our selection to only those records whose id matches the id from the client.  In this case the client is submitting a for so we are dealing with req.body instead of req.params.  This where clause will only have one match so we will be working with one user.
            .where("id", req.body.user.id)
            //Updating the user record that matched the where clause condition
            .update(req.body.user)
            .then(() => {
                //Redirecting to the /users route so that all of the users will be shown to the client.  They should be able to see that the record they just edited has been updated in the database.
                res.redirect("/users");
            });
    })
    //Defining the handling for the .delete method on the /users/:user_id route
    .delete((req, res) => {
        //Selecting everything from the users table
        knex('users')
            //Limiting our selection to only the records that match the id being past in from the client's form submission.  This clause will only have one match because ids are unique.
            .where('id', req.body.user.id)
            //Deleting the user that matches our where clause
            .del()
            .then(() => {
                //Redirecting to the /users route so that the client can see that the user they just deleted was removed.
                res.redirect("/users");
            });
    });

module.exports = router;
