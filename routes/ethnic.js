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
  var limit = req.query.limit || 20;
  var offset = req.query.offset || 0;

  Ethnic.findAll({
    limit: limit,
    offset: offset,
    order:['order']
  })
  .then(function(items){
    res.send(items);
  })
});

/* GET item with a given id. */
router.get('/items/:id', function(req, res, next) {
  var id = req.params.id;

  if(id !== undefined)
    Ethnic.findById(id)
    .then(function(item){
      res.send(item);
    })
  else
    res.end();
});

module.exports = router;
