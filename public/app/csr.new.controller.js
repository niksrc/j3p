;(function(){

  angular
    .module('j3p')
    .controller('CsrNewController', CsrNewController);

  CsrNewController.$inject = ['$scope', 'Csr', '$rootScope'];

  function CsrNewController($scope, Csr, $rootScope){
    var vm = this;

    vm.item = {
      pic: '',
      title: '',
      data: {
        description: ''
      }
    };
    
    $rootScope.pageTitle = 'CSR Activities';
    $rootScope.description = '';

    vm.save = save;

    function save(){
      Csr
        .save(vm.item)
        .then(function (response){
          if(response.error){
            $scope.$emit('notify','Error! Unable to save');    
          }else{
            $scope.$emit('notify','Saved !');    
            vm.item = {};
          }
        },function (){
          $scope.$emit('notify','Unable to connect');    
        })
    }
  
  }

})();
