'use strict';

const sanpshot = require('../src/get-sanpshot.js');

describe('sanpshot', function() {

  it('should return hello world', function() {

    expect(sanpshot()).toEqual('hello world');
  });

});
