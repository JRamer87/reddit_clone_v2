"use strict";


let env = process.env.NODE_ENV || 'development';
let config = require('../knexfile')[env];


module.exports = require('knex')(config);
