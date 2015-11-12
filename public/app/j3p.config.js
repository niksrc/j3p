;(function() {

  angular
    .module('j3p')
    .config(config);

    config.$inject = ['$routeProvider', '$httpProvider'];

    function config($routeProvider, $httpProvider) {
      $routeProvider
        .when('/',{
          templateUrl: 'app/views/about.html',
          controller: 'AboutController',
          controllerAs: 'vm'    
        })
        .when('/ethnic',{
          templateUrl: 'app/views/ethnic.html',
          controller: 'EthnicController',
          controllerAs: 'vm'    
        })
        .when('/ethnic/new',{
          templateUrl: 'app/views/ethnicNew.html',
          controller: 'EthnicNewController',
          controllerAs: 'vm'    
        })
        .when('/ethnic/:id/edit',{
          templateUrl: 'app/views/ethnicEdit.html',
          controller: 'EthnicEditController',
          controllerAs: 'vm'    
        })
        .when('/men',{
          templateUrl: 'app/views/men.html',
          controller: 'MenController',
          controllerAs: 'vm'    
        })
        .when('/women',{
          templateUrl: 'app/views/women.html',
          controller: 'WomenController',
          controllerAs: 'vm'    
        })
        .otherwise({
          redirectTo: '/'
        })


        $httpProvider.defaults.headers.delete = { 
          'Content-Type': 'application/json;charset=utf-8' 
        };
    }

})();