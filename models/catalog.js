var Sequelize = require('sequelize')
var db = require('../lib/db');

var Catalog = db.define('catalog', {
  title: Sequelize.STRING,
  order: Sequelize.BIGINT,
  pic: Sequelize.STRING,
  data: Sequelize.JSON,
},{
  classMethods: {
    getMaxOrder: function() {
      return Catalog.max('order');
    },
    /*
    * Reorder increments or decrements items between prev and new order
    * inclusive of new order depending on the direction.
    **/
    reorder: function(id, prevOrder,newOrder) {

      var direction = newOrder < prevOrder
      var inc = (direction)? ' + ':' - ';
      var between = [prevOrder,newOrder].sort();
      var query = 'UPDATE catalogs SET "order" = "order"' + inc + 1;
      query += ' where "order" BETWEEN ' + between.join(' AND ');
      console.log(query);

      return db.query(query)
      .then(function(response){

        return Catalog.update({
          order: newOrder
        },{
          where:{
            id: id
          }
        })

      });



    },
    saveMe: function(attributes) {
      return Catalog
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          attributes.order = value+1;
          return Catalog.create(attributes);
        })
    }
  }
})

Catalog.sync({});
module.exports = Catalog;