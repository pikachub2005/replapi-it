/*
 * structures
 * 
 *
 * Copyright (c) 2013 Mark Selby
 * Licensed under the MIT license.
 */

'use strict';

var Metadata = function Metadata(req, data, options) {
  this.req = req;
  this.options = options || {};
  this.result = {
    data: data
  };
};

var p = Metadata.prototype;

p.wrap = function () {
  if (this.result.data.length === 1) {
    return this.result.data[0];
  }

  this.result.count = this.result.data.length;
  this.result.page = 21;
  return this.result;
};

module.exports = Metadata;
