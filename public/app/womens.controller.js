;(function(){

  angular
    .module('j3p')
    .controller('WomensController', WomensController);

  WomensController.$inject = ['$scope', 'Womens', '$rootScope'];

  function WomensController($scope, Womens, $rootScope){
    var vm = this;

    vm.items = [];
    vm.params = {
      limit: 20,
      offset: 0, 
    }
    
    $rootScope.pageTitle = 'Womens Collections';
    $rootScope.description = '';


    vm.fetch = fetch;
    vm.reorder = reorder;
    vm.refresh = fetch;
    vm.remove = remove;
    fetch();

    function fetch(){
      Womens
        .query(vm.params)
        .then(function (items){
          vm.items = items.data;
        },function (){
          vm.items = [];
        })
    }
    function reorder(item, prevIndex, newIndex){
      var diff = prevIndex - newIndex;

      Womens
        .reorder({
          id: item.id,
          diff: diff
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
      Womens
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
