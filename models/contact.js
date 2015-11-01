var Sequelize = require('sequelize')
var db = require('../lib/db');

var Contact = db.define('contact', {
  data: Sequelize.JSON,
});

Contact.sync({});
module.exports = Contact;