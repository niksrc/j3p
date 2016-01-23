;(function(){

  angular
    .module('j3p')
    .controller('CsrEditController', CsrEditController);

  CsrEditController.$inject = ['$scope', 'Csr', '$rootScope', '$routeParams'];

  function CsrEditController($scope, Csr, $rootScope, $routeParams){
    var vm = this;
    vm.id = $routeParams.id;
    vm.pic = {
      url: undefined
    };
    vm.item = {
      pic: null,
      title: '',
      data: {
        description: ''
      }
    };
    
    $rootScope.pageTitle = 'CSR Activities';
    $rootScope.description = '';

    vm.update = update;
    vm.sync = sync;

    sync();
    
    function update(){
      Csr
        .update(vm.id,vm.item)
        .then(function (response){
          if(response.error){
            $scope.$emit('notify','Error! Unable to update');    
          }else{
            $scope.$emit('notify','Updated !');
            vm.sync();    
          }
        },function (){
          $scope.$emit('notify','Unable to connect');    
        })
    }

    function sync(){
      Csr
        .get(vm.id)
        .then(function(response) {
          vm.pic.url = response.data.pic;
          vm.item = response.data;
        })
    }
  
  }

})();
