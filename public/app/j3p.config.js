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
        .when('/slider',{
          templateUrl: 'app/views/slider.html',
          controller: 'SliderController',
          controllerAs: 'vm'    
        })
        .when('/slider/new',{
          templateUrl: 'app/views/sliderNew.html',
          controller: 'SliderNewController',
          controllerAs: 'vm'    
        })
        .when('/slider/:id/edit',{
          templateUrl: 'app/views/sliderEdit.html',
          controller: 'SliderEditController',
          controllerAs: 'vm'    
        })
        .when('/about',{
          templateUrl: 'app/views/about.html',
          controller: 'AboutController',
          controllerAs: 'vm'    
        })
        .when('/about/:id/edit',{
          templateUrl: 'app/views/aboutEdit.html',
          controller: 'AboutEditController',
          controllerAs: 'vm'    
        })
        .when('/contact',{
          templateUrl: 'app/views/contact.html',
          controller: 'ContactController',
          controllerAs: 'vm'    
        })
        .when('/contact/:id/edit',{
          templateUrl: 'app/views/contactEdit.html',
          controller: 'ContactEditController',
          controllerAs: 'vm'    
        })
        .when('/cafe',{
          templateUrl: 'app/views/cafe.html',
          controller: 'CafeController',
          controllerAs: 'vm'    
        })
        .when('/cafe/new',{
          templateUrl: 'app/views/cafeNew.html',
          controller: 'CafeNewController',
          controllerAs: 'vm'    
        })
        .when('/cafe/:id/edit',{
          templateUrl: 'app/views/cafeEdit.html',
          controller: 'CafeEditController',
          controllerAs: 'vm'    
        })
        .when('/csr',{
          templateUrl: 'app/views/csr.html',
          controller: 'CsrController',
          controllerAs: 'vm'    
        })
        .when('/csr/new',{
          templateUrl: 'app/views/csrNew.html',
          controller: 'CsrNewController',
          controllerAs: 'vm'    
        })
        .when('/csr/:id/edit',{
          templateUrl: 'app/views/csrEdit.html',
          controller: 'CsrEditController',
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