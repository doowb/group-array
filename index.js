/*!
 * group-array <https://github.com/doowb/group-array>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

// var union = require('union-value');
var typeOf = require('kind-of');
// var reduce = require('arr-reduce');
var reduce = require('object.reduce');
var extend = require('extend-shallow');
var get = require('get-value');

function groupArray(arr, props, opts) {
  if (arr == null) {
    return [];
  }


  if (!Array.isArray(arr)) {
    throw new TypeError('group-array expects an array.');
  }

  if (arguments.length === 1) {
    return arr.sort();
  }

  props = flatten([].slice.call(arguments, 1));

  // if the last argument appears to be a plain object,
  // it's not a valid `compare` arg, so it must be options.
  if (typeOf(props[props.length - 1]) === 'object') {
    opts = props.pop();
  }

  var prop = props.shift();
  var groups = groupBy(arr, prop);

  while (props.length) {
    prop = props.shift();
    groups = subGroup(groups, prop);
  }
  return groups;
}

function groupBy(arr, prop) {
  var len = arr.length, i = -1;
  var groups = {};

  while (++i < len) {
    var obj = arr[i];
    // `key` is the (string) value of `prop`
    var key = get(obj, prop);

    groups[key] = groups[key] || [];
    groups[key].push(obj);
  }
  return groups;
}

function subGroup(groups, prop) {
  var res = {};
  for (var key in groups) {
    if (groups.hasOwnProperty(key)) {
      var val = groups[key];
      if (Array.isArray(val)) {
        groups[key] = groupArray(val, prop);
        console.log(groups)
      } else if (typeof val === 'object') {
        // groups[key] = reduce(val, function (acc, v, k) {
        //   acc[k] = groupArray(val, prop);
        //   return acc;
        // }, []);
      }
    }
  }
  return groups;
}

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

// function groupBy (arr, grouper, setter, acc) {
//   if (grouper != null && typeof grouper === 'object') {
//     return groupBy(arr, null, null, grouper);
//   }
//   if (setter != null && typeof setter === 'object') {
//     return groupBy(arr, grouper, null, setter);
//   }

//   acc = acc || {};
//   if (typeof grouper !== 'function') {
//     if (typeof grouper === 'string') {
//       var prop = grouper;
//       grouper = function (acc, value, i) {
//         return get(value, prop);
//       };
//     } else {
//       grouper = function (acc, value, i) {
//         return value.toString();
//       };
//     }
//   }
//   if (typeof setter !== 'function') {
//     setter = function (acc, group, value, i, arr) {
//       if (typeof group === 'undefined') return;
//       union(acc, group, [value]);
//     };
//   }

//   return reduce(arr, function (acc, value, i, arr) {
//     setter(acc, grouper(acc, value, i, arr, setter), value, i, arr);
//     return acc;
//   }, acc);
// }

/**
 * Flatten the given array.
 */

function flatten(arr) {
  return [].concat.apply([], arr);
}

/**
 * Expose `groupArray`
 */

module.exports = groupArray;
