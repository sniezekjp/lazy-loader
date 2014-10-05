angular.module('app', [])
.provider('Lazy', function() {
  function factory($q, $injector) {
    var self = this; 
    return {
      load: function(info) {
        var defer = $q.defer();
        require(['../lib/'+info.file], function(response) {
          if(!$injector.has(info.name)) {
            self.factory(info.name, function() {
              return response;
            });
          }
          defer.resolve(response);
        });
        return defer.promise;
      }
    };
  }
  return {
    $get: factory
  };
})
.config(function(LazyProvider, $provide) {
  LazyProvider.factory = function(name, constructor) {
    $provide.factory(name, constructor);
  }
});