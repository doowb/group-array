/*!
 * group-array <https://github.com/doowb/group-array>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var union = require('union-value');
var reduce = require('arr-reduce');
var get = require('get-value');

module.exports = groupBy;

/**
 * Create groupings from array's values.
 *
 * ```js
 * function grouper (acc, value, i, arr, setter) {
 *   return value.group;
 * }
 *
 * function setter (acc, group, value, i, arr) {
 *   acc[group] = acc[group] || [];
 *   acc[group].push(value);
 * }
 *
 * var arr = [
 *   { group: 'one', content: 'A'},
 *   { group: 'one', content: 'B'},
 *   { group: 'two', content: 'C'},
 *   { group: 'two', content: 'D'},
 *   { group: 'three', content: 'E'},
 *   { group: 'three', content: 'F'}
 * ];
 *
 * var groups = groupBy(arr, grouper, setter);
 * //=> {
 * //=>   one: [
 * //=>     { group: 'one', content: 'A'},
 * //=>     { group: 'one', content: 'B'}
 * //=>   ],
 * //=>   two: [
 * //=>     { group: 'two', content: 'C'},
 * //=>     { group: 'two', content: 'D'}
 * //=>   ],
 * //=>   three: [
 * //=>     { group: 'three', content: 'E'},
 * //=>     { group: 'three', content: 'F'}
 * //=>   ]
 * //=> }
 * ```
 *
 * @param  {Array} `arr` Array to group.
 * @param  {Function} `grouper` Optional grouping function that takes `acc, value, i, arr, setter`
 * @param  {Function} `setter` Optional setter function that takes `acc, group, value, i, arr`
 * @param  {Object|Array} `acc` Optional accumulator object or array passed to the setter function.
 * @return {Object|Array} Object or array containing groups as keys and list of objects as values in the group.
 * @api public
 */

function groupBy (arr, grouper, setter, acc) {
  if (grouper != null && typeof grouper === 'object') {
    return groupBy(arr, null, null, grouper);
  }
  if (setter != null && typeof setter === 'object') {
    return groupBy(arr, grouper, null, setter);
  }

  acc = acc || {};
  if (typeof grouper !== 'function') {
    if (typeof grouper === 'string') {
      var prop = grouper;
      grouper = function (acc, value, i) {
        return get(value, prop);
      };
    } else {
      grouper = function (acc, value, i) {
        return value.toString();
      };
    }
  }
  if (typeof setter !== 'function') {
    setter = function (acc, group, value, i, arr) {
      if (typeof group === 'undefined') return;
      union(acc, group, [value]);
    };
  }

  return reduce(arr, function (acc, value, i, arr) {
    setter(acc, grouper(acc, value, i, arr, setter), value, i, arr);
    return acc;
  }, acc);
}
