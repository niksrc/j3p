var Sequelize = require('sequelize')
var db = require('../lib/db');

var Womens = db.define('womens', {
  title: Sequelize.STRING,
  order: Sequelize.BIGINT,
  pic: Sequelize.STRING,
  data: Sequelize.JSON,
},{
  classMethods: {
    getMaxOrder: function() {
      return Womens.max('order');
    },
    /*
    * Reorder increments or decrements items between prev and new order
    * inclusive of new order depending on the direction.
    **/
    reorder: function(id, prevOrder,newOrder) {

      var direction = newOrder < prevOrder
      var inc = (direction)? ' + ':' - ';
      var between = [prevOrder,newOrder].sort();
      var query = 'UPDATE womens SET "order" = "order"' + inc + 1;
      query += ' where "order" BETWEEN ' + between.join(' AND ');

      return db.query(query)
      .then(function(response){

        return Womens.update({
          order: newOrder
        },{
          where:{
            id: id
          }
        })

      });



    },
    saveMe: function(attributes) {
      return Womens
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          attributes.order = value+1;
          return Womens.create(attributes);
        })
    },
    remove: function(id, order) {
      return Womens
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          value += 1;
          return Womens
            .reorder(id, order, value)
            .then(function(response){
              return Womens.destroy({
                where: {
                  order: value
                }
              })
            })
        })
        
    }
  }
})

Womens.sync({});
module.exports = Womens;