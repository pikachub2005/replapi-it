'use strict';

var Structure = require('../lib/structure.js');
var pg = require('db').pgPool;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.cheese = {
  setUp: function (cb) {
    this.a = 10;
    cb();
  },
  tearDown: function (cb) {
    cb();
  },
  'gorgonzola': function (test) {
    test.expect(2);
    this.a++;
    test.equal(this.a, 11, 'should be placeholder test.');
    test.ok(true, 'Ok test');
    test.done();
  }
};
