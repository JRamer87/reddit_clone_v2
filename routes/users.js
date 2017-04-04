"use strict";

const express = require('express');
const router = express.Router();
const knex = require("../db/knex");

router.route("/")
    .get((req, res) => {
        knex('users')
            .then((users) => {
                console.log(users);
                res.render("users/index", {
                    users: users
                });
            });
    })
    .post((req, res) => {
        knex('users')
            .insert(req.body.user)
            .returning("id")
            .then((id) => {
                res.redirect(`/users/${id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    });

router.route("/new")
    .get((req, res) => {
        res.render("users/new");
    });
router.route("/edit")
    .get((req, res) => {
        res.render("users/edit");
    });
router.route("/delete")
    .get((req, res) => {
        res.render("users/delete");
    });


router.route("/:user_id")
    .get((req, res) => {
        knex('users')
            .where("id", req.params.user_id)
            .then((user) => {
                console.log(req.params.user_id);
                console.log(user);
                res.render("users/show", {
                    id: user[0].id,
                    name: user[0].full_name,
                    username: user[0].username
                });
            });
    })
    .put((req, res) => {
        knex('users')
            .where("id", req.body.user.id)
            .update(req.body.user)
            .then(() => {
                console.log(res);
                res.redirect("/users");
            });
    })
    .delete((req, res) => {
        knex('users')
            .where('id', req.body.user.id)
            .del()
            .then(() => {
                res.redirect("/users");
            });
    });

module.exports = router;
