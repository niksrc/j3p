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
        .when('/mens',{
          templateUrl: 'app/views/mens.html',
          controller: 'MensController',
          controllerAs: 'vm'    
        })
        .when('/mens/new',{
          templateUrl: 'app/views/mensNew.html',
          controller: 'MensNewController',
          controllerAs: 'vm'    
        })
        .when('/mens/:id/edit',{
          templateUrl: 'app/views/mensEdit.html',
          controller: 'MensEditController',
          controllerAs: 'vm'    
        })
        .when('/womens',{
          templateUrl: 'app/views/womens.html',
          controller: 'WomensController',
          controllerAs: 'vm'    
        })
        .when('/womens/new',{
          templateUrl: 'app/views/womensNew.html',
          controller: 'WomensNewController',
          controllerAs: 'vm'    
        })
        .when('/womens/:id/edit',{
          templateUrl: 'app/views/womensEdit.html',
          controller: 'WomensEditController',
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