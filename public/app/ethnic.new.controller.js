;(function(){

  angular
    .module('j3p')
    .controller('EthnicNewController', EthnicNewController);

  EthnicNewController.$inject = ['$scope', 'Ethnic', '$rootScope'];

  function EthnicNewController($scope, Ethnic, $rootScope){
    var vm = this;

    vm.item = {
      pic: '',
      title: '',
      data: {
        description: ''
      }
    };
    
    $rootScope.pageTitle = 'Ethnic Collections';
    $rootScope.description = '';

    vm.save = save;

    function save(){
      Ethnic
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
