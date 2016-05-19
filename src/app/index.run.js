(function() {
  'use strict';

  angular
    .module('skylinkTest')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
