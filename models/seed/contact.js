var Contact = require('../contact');
require('dotenv').load();

Contact.create({
  data:{
    email: 'abcded@sad.com',
    tel: 'abcded@sad.com',
    address: 'abcded@sad.com',
    pic:'sample.jpg'
  }
})