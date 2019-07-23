'use strict';

const util = require('util');
const groupBy = require('..');

let arr = [
  { data: { year: '2016', tag: 'one', month: 'jan', day: '01' }, content: '...' },
  { data: { year: '2016', tag: 'one', month: 'jan', day: '01' }, content: '...' },
  { data: { year: '2016', tag: 'one', month: 'jan', day: '02' }, content: '...' },
  { data: { year: '2016', tag: 'one', month: 'jan', day: '02' }, content: '...' },
  { data: { year: '2016', tag: 'one', month: 'feb', day: '10' }, content: '...' },
  { data: { year: '2016', tag: 'one', month: 'feb', day: '10' }, content: '...' },
  { data: { year: '2016', tag: 'one', month: 'feb', day: '12' }, content: '...' },
  { data: { year: '2016', tag: 'one', month: 'feb', day: '12' }, content: '...' },
  { data: { year: '2016', tag: 'two', month: 'jan', day: '14' }, content: '...' },
  { data: { year: '2016', tag: 'two', month: 'jan', day: '14' }, content: '...' },
  { data: { year: '2016', tag: 'two', month: 'jan', day: '16' }, content: '...' },
  { data: { year: '2016', tag: 'two', month: 'jan', day: '16' }, content: '...' },
  { data: { year: '2016', tag: 'two', month: 'feb', day: '18' }, content: '...' },
  { data: { year: '2017', tag: 'two', month: 'feb', day: '18' }, content: '...' },
  { data: { year: '2017', tag: 'two', month: 'feb', day: '10' }, content: '...' },
  { data: { year: '2017', tag: 'two', month: 'feb', day: '10' }, content: '...' },
  { data: { year: '2017', tag: 'three', month: 'jan', day: '01' }, content: '...' },
  { data: { year: '2017', tag: 'three', month: 'jan', day: '01' }, content: '...' },
  { data: { year: '2017', tag: 'three', month: 'jan', day: '02' }, content: '...' },
  { data: { year: '2017', tag: 'three', month: 'jan', day: '02' }, content: '...' },
  { data: { year: '2017', tag: 'three', month: 'feb', day: '01' }, content: '...' },
  { data: { year: '2017', tag: 'three', month: 'feb', day: '01' }, content: '...' },
  { data: { year: '2017', tag: 'three', month: 'feb', day: '02' }, content: '...' },
  { data: { year: '2017', tag: 'three', month: 'feb', day: '02' }, content: '...' }
]

let res = groupBy(arr, 'data.year', 'data.tag', 'data.month', 'data.day');
console.log(util.inspect(res, { depth: null }));
