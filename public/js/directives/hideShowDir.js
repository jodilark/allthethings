angular.module('app').directive('hideShow', function () {
  return {
    priority:1001, // compiles first
    terminal:true, // prevent lower priority directives to compile after it
    compile: function(el) {
      el.removeAttr('my-dir'); // necessary to avoid infinite compile loop
      el.attr('ng-click', 'fxn()');
      var fn = $compile(el);
      return function(scope){
        fn(scope);
      };
    }
  };
});