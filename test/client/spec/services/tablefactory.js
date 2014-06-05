'use strict';

describe('Service: TableFactory', function () {

  // load the service's module
  beforeEach(module('atashiApp'));

  // instantiate service
  var TableFactory;
  beforeEach(inject(function (_TableFactory_) {
    TableFactory = _TableFactory_;
  }));

  it('should do something', function () {
    expect(!!TableFactory).toBe(true);
  });

});
