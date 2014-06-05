'use strict';

describe('Service: Nodes', function () {

  // load the service's module
  beforeEach(module('atashiApp'));

  // instantiate service
  var Nodes;
  beforeEach(inject(function (_Nodes_) {
    Nodes = _Nodes_;
  }));

  it('should do something', function () {
    expect(!!Nodes).toBe(true);
  });

});
