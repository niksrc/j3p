;(function() {

  angular
    .module('core')
    .directive('toast', toast);

  toast.$inject = ['$timeout'];

  function toast($timeout) {
    var directive = {
      restrict: 'A',
      template: '<p>{{content}}</p>',
      scope: false,
      link: linkFunction
    }

    return directive;

    function linkFunction(scope, element, attrs) {

      scope.$on('notify', function(e, value) {
        scope.content = value;
        element.toggleClass('toast--show');
        $timeout(function() {
          element.toggleClass('toast--show');
        }, 4000);
      })

    }
  }







})();