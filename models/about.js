var Sequelize = require('sequelize')
var db = require('../lib/db');

var About = db.define('about', {
  data: Sequelize.JSON,
});

About.sync({});
module.exports = About;