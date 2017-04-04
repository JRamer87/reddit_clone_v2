"use strict";
//Templating engine
const ejs = require('ejs');
//Makes creation of HTTP servers much easier
const express = require('express');
//Gives you acess to express methods suchs as .get, .post, .put etc...
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

//Sets the view engine to ejs which looks in the views folder by default
app.set('view engine', 'ejs');
//Logs the type of request and route as it hits the server
app.use(morgan("tiny"));
//Parses incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({
    extended: true //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
}));
//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride("_method"));
//Renders the home page from the statics folder in views
app.get("/", (req, res) => {
    res.render("statics/home");
});
//Sets the router to usersRouter anytime a url starts with /users
app.use("/users", usersRouter);
//Sets the router to postsRouter anytime a url starts with /posts
app.use("/posts", postsRouter);
//Sets the router to commentsRouter anytime a url starts with /comments
app.use("/comments", commentsRouter);
//Tells the server to listen on the process.env port or 3000 if no process.env.PORT is provided also logs "Listening on port 3000" to the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});
