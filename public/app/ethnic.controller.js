;(function(){

  angular
    .module('j3p')
    .controller('EthnicController', EthnicController);

  EthnicController.$inject = ['$scope', 'Ethnic', '$rootScope'];

  function EthnicController($scope, Ethnic, $rootScope){
    var vm = this;

    vm.items = [];
    vm.params = {
      limit: 20,
      offset: 0, 
    }
    
    $rootScope.pageTitle = 'Ethnic Collections';
    $rootScope.description = '';


    vm.fetch = fetch;
    vm.reorder = reorder;
    vm.refresh = fetch;
    vm.remove = remove;
    fetch();

    function fetch(){
      Ethnic
        .query(vm.params)
        .then(function (items){
          vm.items = items.data;
        },function (){
          vm.items = [];
        })
    }
    function reorder(item, prevIndex, newIndex){
      var diff = prevIndex - newIndex;
      var order = diff + +item.order;
      Ethnic
        .reorder({
          id: item.id,
          prevOrder: +item.order,
          newOrder: order
        })
        .then(function(response){
          if(!response.error){
            $scope.$emit('notify','Reordered');
          }else{
            $scope.$emit('notify','Unable to reorder');
            fetch();
          }

        })
    }

    function remove(id, index, order){
      Ethnic
        .remove(id, order)
        .then(function (response){
            if(response.error)
              $scope.$emit('notify','Unable to remove');
            else{
              vm.items.splice(index,1);  
              $scope.$emit('notify','Removed');
            }
        })
    }
  }


})();
