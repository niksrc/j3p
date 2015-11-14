var About = require('../about');
var Contact = require('../contact');
require('dotenv').load();
About.create({
  data:{
    content: 'Initial Seed'
  }
})