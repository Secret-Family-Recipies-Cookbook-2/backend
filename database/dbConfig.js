// const knex = require("knex");

// const knexfile = require("../knexfile.js");
// const environment = process.env.DB_ENV || "development";

// module.exports = knex(knexfile[environment]);


const knex = require('knex');

const config = require('../knexfile.js');

module.exports = knex(config.development);