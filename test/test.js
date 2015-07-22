'use strict';

/* deps: mocha */
var util = require('util');
var assert = require('assert');
var groupArray = require('../');
require('should');

describe('errors', function () {
  it('should throw an error when invalid args are passed:', function () {
    (function () {
      groupArray('');
    }).should.throw('group-array expects an array.');
  });

  it('should throw an error when the group `key` is not a string:', function () {
    var arr = [{foo: function(){}, content: 'A'}];
    var foo = JSON.stringify(function(){});

    (function () {
      groupArray(arr, 'foo');
    }).should.throw('group-array expects group keys to be strings or objects: ' + foo);
  });
});

describe('group-array', function () {
  it('should return an empty array when an empty array is passed:', function () {
    groupArray([]).should.eql([]);
  });

  it('should return the original array when no grouping properties are passed:', function () {
    groupArray(['a', 'b', 'c']).should.eql(['a', 'b', 'c']);
  });

  it('should create groups based on the value of the specified property', function () {
    var arr = [
      {tag: 'one', content: 'A'},
      {tag: 'one', content: 'B'},
      {tag: 'two', content: 'C'},
      {tag: 'two', content: 'D'},
      {tag: 'three', content: 'E'},
      {tag: 'three', content: 'F'}
    ];

    var actual = groupArray(arr, 'tag');

    assert.deepEqual(actual, {
      one: [
        {tag: 'one', content: 'A'},
        {tag: 'one', content: 'B'}
      ],
      two: [
        {tag: 'two', content: 'C'},
        {tag: 'two', content: 'D'}
      ],
      three: [
        {tag: 'three', content: 'E'},
        {tag: 'three', content: 'F'}
      ],
    });
  });

  it('should support passing the property as an array:', function () {
    var arr = [
      {tag: 'one', content: 'A'},
      {tag: 'one', content: 'B'},
      {tag: 'two', content: 'C'},
      {tag: 'two', content: 'D'},
      {tag: 'three', content: 'E'},
      {tag: 'three', content: 'F'}
    ];

    var actual = groupArray(arr, ['tag']);

    assert.deepEqual(actual, {
      one: [
        {tag: 'one', content: 'A'},
        {tag: 'one', content: 'B'}
      ],
      two: [
        {tag: 'two', content: 'C'},
        {tag: 'two', content: 'D'}
      ],
      three: [
        {tag: 'three', content: 'E'},
        {tag: 'three', content: 'F'}
      ],
    });
  });

  it('should create groups based on the value of nested properties', function () {
    var arr = [
      { data: { tag: 'one' }, content: 'A'},
      { data: { tag: 'one' }, content: 'B'},
      { data: { tag: 'two' }, content: 'C'},
      { data: { tag: 'two' }, content: 'D'},
      { data: { tag: 'three' }, content: 'E'},
      { data: { tag: 'three' }, content: 'F'}
    ];

    var actual = groupArray(arr, 'data.tag');

    assert.deepEqual(actual, {
      one: [
        {data: {tag: 'one'}, content: 'A'},
        {data: {tag: 'one'}, content: 'B'}
      ],
      two: [
        {data: {tag: 'two'}, content: 'C'},
        {data: {tag: 'two'}, content: 'D'}
      ],
      three: [
        {data: {tag: 'three'}, content: 'E'},
        {data: {tag: 'three'}, content: 'F'}
      ],
    });
  });

  it('should create groups from properties with object values:', function () {
    var arr = [
      { data: { categories: { one: [ 'one' ] }}, content: 'A'},
      { data: { categories: { one: [ 'one' ] }}, content: 'B'},
      { data: { categories: { one: [ 'two' ] }}, content: 'C'},
      { data: { categories: { two: [ 'two' ] }}, content: 'D'},
      { data: { categories: { two: [ 'three' ] }}, content: 'E'},
      { data: { categories: { two: [ 'three' ] }}, content: 'F'}
    ];

    var actual = groupArray(arr, 'data.categories');

    assert.deepEqual(Object.keys(actual), ['one', 'two']);
  });

  it('should create multiple, nested groups:', function () {
    var fixture = require('./fixtures/nested.js');
    var actual = groupArray(fixture, 'data.tag', 'data.month');
    assert.deepEqual(actual, require('./expected/nested.js'));
  });

  it('should create multiple, deeply nested groups:', function () {
    var fixture = require('./fixtures/deeply-nested.js');
    var actual = groupArray(fixture, 'data.tag', 'data.month', 'data.day');
    assert.deepEqual(actual, require('./expected/deeply-nested.js'));
  });

  it('should create multiple, insanely nested groups:', function () {
    var fixture = require('./fixtures/insanely-nested.js');
    var actual = groupArray(fixture, 'data.year', 'data.tag', 'data.month', 'data.day');
    assert.deepEqual(actual, require('./expected/insanely-nested.js'));
  });

  it('should support properties as an array:', function () {
    var fixture = require('./fixtures/insanely-nested.js');
    var actual = groupArray(fixture, ['data.year', 'data.tag', 'data.month', 'data.day']);
    assert.deepEqual(actual, require('./expected/insanely-nested.js'));
  });
});
