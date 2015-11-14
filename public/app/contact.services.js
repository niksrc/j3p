;(function() {

  angular
    .module('core')
    .service('Contact',contact);

  contact.$inject = ['$http', 'Upload'];
  
  function contact(http, Upload) {
    
    var apiUrl = '/api/contact/items/';
    var service = {
      query: query,
      get: get,
      update: edit,
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
      if(typeof params.data.pic === 'string' || params.data.pic === null)
        return http
          .post(apiUrl+id,params);
      else
        return Upload
          .upload({
            url: apiUrl+id,
            data: params,
            objectKey: '.k'
          })
    }

  }  

})();