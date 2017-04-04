"use strict";

const express = require('express');
const router = express.Router();
const knex = require("../db/knex");

router.route("/")
    .get((req, res) => {
        knex('comments')
            .then((comments) => {
                console.log(comments);
                res.render("comments/index", {
                    comments: comments
                });
            });
    })
    .post((req, res) => {
        knex('comments')
            .insert(req.body.comment)
            .returning("id")
            .then((id) => {
                res.redirect(`/comments/${id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    });

router.route("/new")
    .get((req, res) => {
        res.render("comments/new");
    });
router.route("/edit")
    .get((req, res) => {
        res.render("comments/edit");
    });
router.route("/delete")
    .get((req, res) => {
        res.render("comments/delete");
    });

router.route("/:comment_id")
    .get((req, res) => {
        knex('comments')
            .where("id", req.params.comment_id)
            .then((comment) => {
                console.log(req.params.comment_id);
                console.log(comment);
                res.render("comments/show", {
                    id: comment[0].id,
                    body: comment[0].body,
                    post_id: comment[0].post_id
                });
            });
    })
    .put((req, res) => {
        knex('comments')
            .where("id", req.body.comment.id)
            .update(req.body.comment)
            .then(() => {
                res.redirect("/comments");
            });
    })
    .delete((req, res) => {
        knex('comments')
            .where('id', req.body.comment.id)
            .del()
            .then(() => {
                res.redirect("/comments");
            });
    });


module.exports = router;
