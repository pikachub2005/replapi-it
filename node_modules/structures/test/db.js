'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

// Set up database
var anyDB = require('any-db');
var pgConnStr = 'postgres://postgres@127.0.0.1:5432/test_db';

exports.pgPool = anyDB.createPool(pgConnStr, {
  min: 5,
  max: 15,
  onConnect: function (conn, done) {
    done(null, conn);
  },
  reset: function (conn, done) {
    done(null);
  }
});
