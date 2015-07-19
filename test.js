'use strict';

var assert = require('assert');
var groupBy = require('./');
var get = require('get-value');

describe('group-array', function () {
  it('should group an array with default values', function () {
    var obj = [
      'one',
      'one',
      'two',
      'two',
      'three',
      'three'
    ];

    var groups = groupBy(obj);
    var expected = {
      one: ['one'],
      two: ['two'],
      three: ['three']
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an array with specified property', function () {
    var obj = [
      {group: 'one', content: 'A'},
      {group: 'one', content: 'B'},
      {group: 'two', content: 'C'},
      {group: 'two', content: 'D'},
      {group: 'three', content: 'E'},
      {group: 'three', content: 'F'}
    ];

    var groups = groupBy(obj, 'group');
    var expected = {
      one: [
        {group: 'one', content: 'A'},
        {group: 'one', content: 'B'}
      ],
      two: [
        {group: 'two', content: 'C'},
        {group: 'two', content: 'D'}
      ],
      three: [
        {group: 'three', content: 'E'},
        {group: 'three', content: 'F'}
      ],
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an array with specified grouper', function () {
    function grouper (acc, value, i, arr, setter) {
      return value.group;
    }

    var arr = [
      {group: 'one', content: 'A'},
      {group: 'one', content: 'B'},
      {group: 'two', content: 'C'},
      {group: 'two', content: 'D'},
      {group: 'three', content: 'E'},
      {group: 'three', content: 'F'}
    ];

    var groups = groupBy(arr, grouper);
    var expected = {
      one: [
        {group: 'one', content: 'A'},
        {group: 'one', content: 'B'}
      ],
      two: [
        {group: 'two', content: 'C'},
        {group: 'two', content: 'D'}
      ],
      three: [
        {group: 'three', content: 'E'},
        {group: 'three', content: 'F'}
      ]
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an array with specified setter', function () {

    function setter (acc, group, value, i, arr) {
      acc[group] = acc[group] || [];
      acc[group].push(value);
    }

    var arr = [
      'one',
      'one',
      'two',
      'two',
      'three',
      'three'
    ];

    var groups = groupBy(arr, null, setter);
    var expected = {
      one: ['one', 'one'],
      two: ['two', 'two'],
      three: ['three', 'three']
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an array with specified grouper and setter', function () {
    function grouper (acc, value, i, arr, setter) {
      return value.group;
    }

    function setter (acc, group, value, i, arr) {
      acc[group] = acc[group] || [];
      acc[group].push(value);
    }

    var arr = [
      {group: 'one', content: 'A'},
      {group: 'one', content: 'B'},
      {group: 'two', content: 'C'},
      {group: 'two', content: 'D'},
      {group: 'three', content: 'E'},
      {group: 'three', content: 'F'}
    ];

    var groups = groupBy(arr, grouper, setter);
    var expected = {
      one: [
        {group: 'one', content: 'A'},
        {group: 'one', content: 'B'}
      ],
      two: [
        {group: 'two', content: 'C'},
        {group: 'two', content: 'D'}
      ],
      three: [
        {group: 'three', content: 'E'},
        {group: 'three', content: 'F'}
      ]
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an array with specified accumulator', function () {
    var arr = [
      'one',
      'one',
      'two',
      'two',
      'three',
      'three'
    ];

    var acc = {
      foo: {bar: 'baz'}
    };

    var groups = groupBy(arr, acc);
    var expected = {
      foo: {bar: 'baz'},
      one: ['one'],
      two: ['two'],
      three: ['three']
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an array with grouper calling setter', function () {
    function grouper (acc, value, i, arr, setter) {
      switch (value.group) {
        case 'one': setter(acc, 1, value, i, arr); break;
        case 'two': setter(acc, 2, value, i, arr); break;
        case 'three': setter(acc, 3, value, i, arr); break;
      }
      return value.group;
    }

    function setter (acc, group, value, i, arr) {
      acc[group] = acc[group] || [];
      acc[group].push(value);
    }

    var arr = [
      {group: 'one', content: 'A'},
      {group: 'one', content: 'B'},
      {group: 'two', content: 'C'},
      {group: 'two', content: 'D'},
      {group: 'three', content: 'E'},
      {group: 'three', content: 'F'}
    ];

    var groups = groupBy(arr, grouper, setter);
    var expected = {
      one: [{group: 'one', content: 'A'}, {group: 'one', content: 'B'}],
      '1': [{group: 'one', content: 'A'}, {group: 'one', content: 'B'}],
      two: [{group: 'two', content: 'C'}, {group: 'two', content: 'D'}],
      '2': [{group: 'two', content: 'C'}, {group: 'two', content: 'D'}],
      three: [{group: 'three', content: 'E'}, {group: 'three', content: 'F'}],
      '3': [{group: 'three', content: 'E'}, {group: 'three', content: 'F'}]
    };
    assert.deepEqual(groups, expected);
  });

  it('should group multiple "tags" together', function () {
    function grouper (acc, value, i, arr, setter) {
      var tags = value.tags;
      if (typeof tags === 'undefined') return;
      tags = Array.isArray(tags) ? tags : [tags];
      tags.forEach(function (tag) {
        setter(acc, tag, value, i, arr);
      });
    }

    var arr = [
      {tags: ['one'], content: 'A'},
      {tags: ['one', 'two'], content: 'B'},
      {tags: ['two'], content: 'C'},
      {tags: ['two', 'three'], content: 'D'},
      {tags: ['three'], content: 'E'},
      {tags: ['three', 'four'], content: 'F'},
      {content: 'G'}
    ];

    var groups = groupBy(arr, grouper);
    var expected =  {
      one: [
        {tags: ['one'], content: 'A'},
        {tags: ['one', 'two'], content: 'B'}
      ],
      two: [
        {tags: ['one', 'two'], content: 'B'},
        {tags: ['two'], content: 'C'},
        {tags: ['two', 'three'], content: 'D'}
      ],
      three: [
        {tags: ['two', 'three'], content: 'D'},
        {tags: ['three'], content: 'E'},
        {tags: ['three', 'four'], content: 'F'}
      ],
      four: [
        {tags: ['three', 'four'], content: 'F'}
      ]
    };
    assert.deepEqual(groups, expected);
  });
});
