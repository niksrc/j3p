;(function(){

  angular
    .module('j3p')
    .controller('MensNewController', MensNewController);

  MensNewController.$inject = ['$scope', 'Mens', '$rootScope'];

  function MensNewController($scope, Mens, $rootScope){
    var vm = this;

    vm.item = {
      pic: '',
      title: '',
      data: {
        description: ''
      }
    };
    
    $rootScope.pageTitle = 'Mens Collections';
    $rootScope.description = '';

    vm.save = save;

    function save(){
      Mens
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
