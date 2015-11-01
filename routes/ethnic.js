var express = require('express');
var multer = require('multer')
var Ethnic = require('../models/ethnic');
var router = express.Router();

/*
* These routes are for items present in catalogs.
*
**/

/* GET items listing. */
router.get('/items/', function(req, res, next) {
  limit = req.query.limit || 20;
  offset = req.query.offset || 0;

  Ethnic.findAll({
    limit: limit,
    offset: offset,
    order:['order']
  })
  .then(function(items){
    res.send(items);
  })
});

module.exports = router;
