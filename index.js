/*!
 * group-array <https://github.com/doowb/group-array>
 *
 * Copyright (c) 2015, 2017, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

var union = require('union-value');
var flatten = require('arr-flatten');
var forOwn = require('for-own');
var typeOf = require('kind-of');
var get = require('get-value');

function groupFn(arr, props) {
  if (arr == null) {
    return [];
  }

  if (!Array.isArray(arr)) {
    throw new TypeError('group-array expects an array.');
  }

  if (arguments.length === 1) {
    return arr;
  }

  var args = flatten([].slice.call(arguments, 1));
  var groups = groupBy(arr, args[0]);

  for (var i = 1; i < args.length; i++) {
    toGroup(groups, args[i]);
  }
  return groups;
}

function groupBy(arr, prop, key) {
  var groups = {};

  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];
    var val;

    // allow a function to modify the object
    // and/or return a val to use
    if (typeof prop === 'function') {
      val = prop.call(groups, obj, key);
    } else {
      val = get(obj, prop);
    }

    switch (typeOf(val)) {
      case 'undefined':
        break;
      case 'string':
      case 'number':
        union(groups, String(val), obj);
        break;
      case 'object':
      case 'array':
        eachValue(groups, obj, val);
        break;
      case 'function':
        throw new Error('invalid argument type: ' + key);
    }
  }
  return groups;
}

function eachValue(groups, obj, val) {
  if (Array.isArray(val)) {
    val.forEach(function(key) {
      union(groups, key, obj);
    });
  } else {
    forOwn(val, function(v, key) {
      union(groups, key, obj);
    });
  }
}

function toGroup(groups, prop) {
  forOwn(groups, function(val, key) {
    if (!Array.isArray(val)) {
      groups[key] = toGroup(val, prop, key);
    } else {
      groups[key] = groupBy(val, prop, key);
    }
  });
  return groups;
}

/**
 * Expose `groupArray`
 */

module.exports = groupFn;
