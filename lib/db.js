var Sequelize = require('sequelize');

var env = process.env;

module.exports = new Sequelize(env.DATABASE, env.USERNAME, env.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
      max: 5,
      min: 0,
      idle: 10000
  }

});