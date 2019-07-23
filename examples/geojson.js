'use strict';

// example from https://github.com/doowb/group-array/issues/3
// using geojson data to group into intervals

const util = require('util');
const groupArray = require('..');

// create a function that will use the property provided to group on
function interval(prop) {

  // create a function that will use the intervals to check the group by property
  return intervals => {

    // create custom labels to use for the resulting object keys
    let labels = intervals.reduce((acc, val, i) => {
      let min = val;
      let max = (intervals[i + 1] && intervals[i + 1] - 1) || '*';
      acc[val] = min + ' - ' + max;
      return acc;
    }, {});

    // create a function that does the grouping for each item
    return item => {

      // value to group by
      let val = item[prop];

      // if the value falls between the interval range, return it
      // as an array to make the interval value the key being grouped by
      return intervals.filter((int, i) => {
        let min = int;
        let max = intervals[i+1] || Infinity;
        return min <= val && val < max;
      }).map(function(int) {
        return labels[int];
      });
    };
  };
}

// example data to group
let countries = [{
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
let intervals = [20000, 50000, 100000];

// use population to group by
let population = interval('population');

// group on population intervals only
let res1 = groupArray(countries, population(intervals));

// group on climates within population intervals
let res2 = groupArray(countries, population(intervals), 'climate');

console.log(util.inspect(res1, null, 10));
console.log();
console.log(util.inspect(res2, null, 10));
console.log();
