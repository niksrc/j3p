var assert = require('assert');
require('dotenv').load();
var db = require('../lib/db');

describe('Database', function() {
  it('should connnect to database', function() {
    return db.query('SELECT 2+3 AS sum', { type: db.QueryTypes.SELECT }).then(function(result){
      assert(result[0].sum === 5);
    })
  })
})