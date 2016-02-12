'use strict';

// example from https://github.com/doowb/group-array/issues/3
// using geojson data to group into intervals

var util = require('util');
var groupArray = require('..');

// create a function that will use the property provided to group on
function interval(prop) {

  // create a function that will use the intervals to check the group by property
  return function(intervals) {

    // create custom labels to use for the resulting object keys
    var labels = intervals.reduce(function(acc, val, i) {
      var min = val;
      var max = (intervals[i + 1] && intervals[i + 1] - 1) || '*';
      acc[val] = min + ' - ' + max;
      return acc;
    }, {});

    // create a function that does the grouping for each item
    return function(item) {

      // value to group by
      var val = item[prop];

      // if the value falls between the interval range, return it
      // as an array to make the interval value the key being grouped by
      return intervals.filter(function(int, i) {
        var min = int;
        var max = intervals[i+1] || Infinity;
        return min <= val && val < max;
      }).map(function(int) {
        return labels[int];
      });
    };
  };
}

// example data to group
var countries = [{
  name: 'a',
  population: 23000,
  climate: 'cold'
}, {
  name: 'b',
  population: 34000,
  climate: 'hot'
}, {
  name: 'c',
  population: 55000,
  climate: 'cold'
}, {
  name: 'd',
  population: 66000,
  climate: 'pleasant'
}, {
  name: 'e',
  population: 70000,
  climate: 'cold'
}];

// example intervals to group on
var intervals = [20000, 50000, 100000];

// use population to group by
var population = interval('population');

// group on population intervals only
var res1 = groupArray(countries, population(intervals));

// group on climates within population intervals
var res2 = groupArray(countries, population(intervals), 'climate');

console.log(util.inspect(res1, null, 10));
console.log();
console.log(util.inspect(res2, null, 10));
console.log();
