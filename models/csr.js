var Sequelize = require('sequelize')
var db = require('../lib/db');

var CSR = db.define('csr', {
  title: Sequelize.STRING,
  order: Sequelize.BIGINT,
  pic: Sequelize.STRING,
  data: Sequelize.JSON,
},{
  classMethods: {
    getMaxOrder: function() {
      return CSR.max('order');
    },
    /*
    * Reorder increments or decrements items between prev and new order
    * inclusive of new order depending on the direction.
    **/
    reorder: function(id, prevOrder,newOrder) {

      var direction = newOrder < prevOrder
      var inc = (direction)? ' + ':' - ';
      var between = [prevOrder,newOrder].sort();
      var query = 'UPDATE csrs SET "order" = "order"' + inc + 1;
      query += ' where "order" BETWEEN ' + between.join(' AND ');

      return db.query(query)
      .then(function(response){

        return CSR.update({
          order: newOrder
        },{
          where:{
            id: id
          }
        })

      });



    },
    saveMe: function(attributes) {
      return CSR
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          attributes.order = value+1;
          return CSR.create(attributes);
        })
    },
    remove: function(id, order) {
      return CSR
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          value += 1;
          return CSR
            .reorder(id, order, value)
            .then(function(response){
              return CSR.destroy({
                where: {
                  order: value
                }
              })
            })
        })
        
    }
  }
})

CSR.sync({});
module.exports = CSR;