/*
 * structures
 *
 * Copyright (c) 2013 Mark Selby
 * Licensed under the MIT license.
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Structure = function Structure(structure, params, parent, name) {
  EventEmitter.call(this);

  // Structure to fulfil. Contains :
  // source: method to call that returns a query
  // parent_key: the parent field name for attaching related children
  // key: the field name in our rows to match to the parent rows
  // children: optional substructures for retrieving related sub-data
  this.structure = structure;

  // Parent is set if we're a child (substructure)
  this.parent = parent;

  // Store the params to pass on to queries
  this._params = params;

  // Child rows take their name from the structure declaration
  this.name = name;

  this.prepare();
};

util.inherits(Structure, EventEmitter);

var p = Structure.prototype;

p.init = function init() {
  // Execute the source query for this part of the structure
  this.structure.source(this.params())
    .on('row', (this.parent ? this.childRow.bind(this) : this.rootRow.bind(this)))
    .on('error', this.error.bind(this))
    .on('end', this.end.bind(this))
    .execute();
};

p.prepare = function prepare() {
  this.rows = [];
  // This is the root, so we just place the result rows into an array
  if (!this.parent) { return; }
  // Skip when parent has no rows
  if (!this.parent.rows.length) { return; }

  if (!this.structure.parent_key) {
    throw 'No parent key defined for : ' + Util.inspect(this.structure);
  }
  if (!this.structure.key) {
    throw 'No key defined for : ' + Util.inspect(this.structure);
  }
  if (!this.parent.rows[0].hasOwnProperty(this.structure.parent_key)) {
    throw 'Parent result is missing parent_key field : ' + Util.inspect(this.structure);
  }

  // Create a placholder index into parent rows
  this.parentRows = {};

  // Iterate the parent rows
  this.parent.rows.forEach(function (row) {
    // Ignore parent rows where parent_key field is null-ish
    if (!row[this.structure.parent_key]) { return; }
    // Create results placeholder on each parent row
    row[this.name] = [];
    // Create the indexed by parent_key pointer into the parent rows
    var key = row[this.structure.parent_key];
    if (!this.parentRows[key]) { this.parentRows[key] = []; }
    this.parentRows[key].push(row[this.name]);
  }.bind(this));
};

// If it's the root query then we just stuff the result into the array from prepare()
p.rootRow = function rootRow(row) {
  this.rows.push(row);
};

// Child rows need to be added to all parent rows that have the appropriate key
p.childRow = function childRow(row) {
  var i, j;
  this.rows.push(row);
  for (i = 0, j = this.parentRows[row[this.structure.key]].length; i < j; i++) {
    this.parentRows[row[this.structure.key]][i].push(row);
  }
};

// An object that contains { id: '1,2,3,4' } or { id: [1,2,3,4] }
// When we're dealing with children (substructures) id's are the appropriate parent keys
// to fetch the corresponding child records
p.params = function params() {
  return this.parent ? { id: Object.keys(this.parentRows) } : this._params;
};

// This particular part of the structure has completed
p.end = function end() {
  // Only if we have rows should we bother trying to fetch any child rows
  if (this.rows.length && this.structure.children) {
    this.pending = 0;
    Object.keys(this.structure.children).forEach(function (name) {
      this.pending++;
      new Structure(this.structure.children[name], this.params(), this, name)
        .on('end', this.childEnd.bind(this))
        .on('error', this.error.bind(this))
        .init();
    }.bind(this));
  } else {
    this.emit('end', this.rows);
  }
};

p.error = function error(err) {
  throw 'Structure error : ' + err + ' processing ' + util.inspect(this.structure);
};

p.childEnd = function childDone() {
  this.pending--;
  if (!this.pending) {
    this.emit('end', this.rows);
  }
};

module.exports = Structure;
