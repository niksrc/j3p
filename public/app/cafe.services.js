;(function() {

  angular
    .module('core')
    .service('Cafe', cafe);

  cafe.$inject = ['$http', 'Upload'];
  
  function cafe(http, Upload) {
    
    var apiUrl = '/api/cafe/items/';
    var service = {
      query: query,
      get: get,
      update: edit,
      save: save,
      remove: remove,
      reorder: reorder
    }

    return service;
    
    function query(params){
      return http
        .get(apiUrl,{
          params:params
        });
    }

    function get(id){
      return http
        .get(apiUrl+id);  
    }

    function edit(id, params){
      if(typeof params.pic === 'string' || params.pic === null)
        return http
          .post(apiUrl+id,params);
      else
        return Upload
          .upload({
            url: apiUrl+id,
            data: params
          })
    }

    function save(params){
      return Upload
        .upload({
          url: apiUrl,
          data: params
        })
    }

    function remove(id, order){
      return http
        .delete(apiUrl+id, {
          data: {
            order: order
          }
        });
    }

    function reorder(params){
      return http
        .post(apiUrl+'reorder',params)
    }

  }  

})();