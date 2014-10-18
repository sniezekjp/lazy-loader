define(['js/app'], function(app) {
  app.provider('Lazy', function() {
    function factory($q, $injector) {
      var self = this;
      return {
        load: function(info) {
          var defer = $q.defer();
          if(!angular.isArray(info)) {
            info = [info];
          }
          require(info, function() {
            defer.resolve();
          });
          return defer.promise;
        }
      };
    }
    return {
      $get: factory
    };
  });
  var provider = {};
  app.config(function($provide, $controllerProvider, $compileProvider, $filterProvider) {
    provider.factory = $provide.factory;
    provider.service = $provide.service;
    provider.directive = $compileProvider.directive;
    provider.filter = $filterProvider.register;
    provider.controller = $controllerProvider.register;
  });
  return provider;
});
