const knex = require("knex");
const config = require("../knexfile.js");
const dbKnex = knex(config.development);
module.exports = dbKnex;
