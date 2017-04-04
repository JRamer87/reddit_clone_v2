"use strict";
const express = require('express');
const router = express.Router();
const knex = require("../db/knex");

router.route("/")
    .get((req, res) => {
        knex('posts')
            .then((posts) => {
                console.log(posts);
                res.render("posts/index", {
                    posts: posts
                });
            });
    })
    .post((req, res) => {
        knex('posts')
            .insert(req.body.post)
            .returning("id")
            .then((id) => {
                res.redirect(`/posts/${id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    });

router.route("/new")
    .get((req, res) => {
        res.render("posts/new");
    });
router.route("/edit")
    .get((req, res) => {
        res.render("posts/edit");
    });
router.route("/delete")
    .get((req, res) => {
        res.render("posts/delete");
    });

router.route("/:post_id")
    .get((req, res) => {
        knex('posts')
            .where("id", req.params.post_id)
            .then((post) => {
                console.log(req.params.post_id);
                console.log(post);
                res.render("posts/show", {
                    id: post[0].id,
                    title: post[0].title,
                    body: post[0].body,
                    post_id: post[0].post_id
                });
            });
    })
    .put((req, res) => {
        knex('posts')
            .where("id", req.body.post.id)
            .update(req.body.post)
            .then(() => {
                res.redirect("/posts");
            });
    })
    .delete((req, res) => {
        knex('posts')
            .where('id', req.body.post.id)
            .del()
            .then(() => {
                res.redirect("/posts");
            });
    });


module.exports = router;
