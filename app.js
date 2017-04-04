"use strict";

const ejs = require('ejs');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

app.set('view engine', 'ejs');
//app.use(express.static(__dirname + '/public'));//What is this doing?
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("statics/home");
});

app.use("/users", usersRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});
