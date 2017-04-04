"use strict";
//Templating engine
const ejs = require('ejs');
//Makes creation of HTTP servers much easier
const express = require('express');
//Gives you acess to express methods suchs as .get, .post, .put etc...
const app = express();
//Bringing in method override which will allow us to use HTTP methods not supported by the client(browser)
const methodOverride = require('method-override');
//Bringing in morgan which logs requests and routes as they hit the server
const morgan = require('morgan');
//Bringing in Body parser which parses incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

//Sets the view engine to ejs which looks in the views folder by default
app.set('view engine', 'ejs');
//Telling our app to use morgan
app.use(morgan("tiny"));
//Telling our app to use bodyParser
app.use(bodyParser.urlencoded({
    extended: true //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
}));
//Telling our app to use method override
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
