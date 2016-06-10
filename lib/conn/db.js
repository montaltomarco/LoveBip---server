"use strict";

var Sequelize = require('sequelize');

let db_inst = new Sequelize('lovebip', 'lovebip', 'lovebip', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

exports.db_inst = db_inst;
