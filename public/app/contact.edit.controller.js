;(function(){

  angular
    .module('j3p')
    .controller('ContactEditController', ContactEditController);

  ContactEditController.$inject = ['$scope', 'Contact', '$rootScope', '$routeParams'];

  function ContactEditController($scope, Contact, $rootScope, $routeParams){
    var vm = this;
    vm.id = $routeParams.id;
    vm.pic = {
      url: undefined
    };
    vm.item = {
      data: {
        email: '',
        tel: '',
        address: '',
        pic:null
      }
    };
    
    $rootScope.pageTitle = 'Contact Collections';
    $rootScope.description = '';

    vm.update = update;
    vm.sync = sync;

    sync();
    
    function update(){
      Contact
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
      Contact
        .get(vm.id)
        .then(function(response) {
          vm.pic.url = response.data.data.pic;
          vm.item = response.data;
        })
    }
  
  }

})();
