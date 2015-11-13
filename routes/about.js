var express = require('express');
var About = require('../models/about');
var router = express.Router();

/*
* These routes are for content in about page.
*
**/

/* GET the content as we need only one we limit it to 1. */
router.get('/items/', function(req, res, next) {
  var limit = req.query.limit || 1;
  var offset = req.query.offset || 0;

  About.findAll({
    limit: limit,
    offset: offset,
  })
  .then(function(items){
    res.send(items);
  })
});

/* GET content with a given id. */
router.get('/items/:id', function(req, res, next) {
  var id = req.params.id;

  if(id !== undefined)
    About.findById(id)
    .then(function(item){
      res.send(item);
    })
  else
    res.end();
});

router.post('/items/:id', function(req, res, next) {
  var id = req.params.id;

  About.findById(id)
  .then(function(item){    
      About.update(req.body,{
        where:{
          id:item.id
        }
      })
      .then(function(affectedRows){
        if(affectedRows == 1)
          res.send({'error': false});
        else
          res.send({'error': true});
      })
  
  })

});

module.exports = router;
