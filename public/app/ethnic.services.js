;(function() {

  angular
    .module('core')
    .service('Ethnic',ethnic);

  ethnic.$inject = ['$http', 'Upload'];
  
  function ethnic(http, Upload) {
    
    var apiUrl = '/api/ethnic/items/';
    var service = {
      query: query,
      get: get,
      edit: edit,
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
      if(params.file === undefined)
        return http
          .post(apiUrl+id,{
            data: params
          });
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
        .post(apiUrl+'reorder',{
          data: params
        })
    }

  }  

})();