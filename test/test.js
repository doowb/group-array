'use strict';

const util = require('util');
const assert = require('assert');
const get = require('get-value');
const forOwn = require('for-own');
const union = require('union-value');

const groupArray = require('..');

describe('errors', () => {
  it('should throw an error when invalid args are passed:', () => {
    assert.throws(() => groupArray(''), {
      message: 'group-array expects an array.'
    });
  });
});

describe('group-array', () => {
  it('should return an empty array when an empty array is passed:', () => {
    assert.deepEqual(groupArray([]), []);
  });

  it('should return the original array when no grouping properties are passed:', () => {
    assert.deepEqual(groupArray(['a', 'b', 'c']), ['a', 'b', 'c']);
  });

  it('should create groups based on the value of the specified property', () => {
    let arr = [
      { tag: 'one', content: 'A' },
      { tag: 'one', content: 'B' },
      { tag: 'two', content: 'C' },
      { tag: 'two', content: 'D' },
      { tag: 'three', content: 'E' },
      { tag: 'three', content: 'F' }
    ];

    let actual = groupArray(arr, 'tag');

    assert.deepEqual(actual, {
      one: [
        { tag: 'one', content: 'A' },
        { tag: 'one', content: 'B' }
      ],
      two: [
        { tag: 'two', content: 'C' },
        { tag: 'two', content: 'D' }
      ],
      three: [
        { tag: 'three', content: 'E' },
        { tag: 'three', content: 'F' }
      ],
    });
  });

  it('should create groups based on the value of the specified property when the value has dots', () => {
    let arr = [
      { tag: 'one.foo', content: 'A' },
      { tag: 'one.foo', content: 'B' },
      { tag: 'two.bar', content: 'C' },
      { tag: 'two.bar', content: 'D' },
      { tag: 'three.baz', content: 'E' },
      { tag: 'three.baz', content: 'F' }
    ];

    let actual = groupArray(arr, 'tag');

    assert.deepEqual(actual, {
      'one.foo': [
        { tag: 'one.foo', content: 'A' },
        { tag: 'one.foo', content: 'B' }
      ],
      'two.bar': [
        { tag: 'two.bar', content: 'C' },
        { tag: 'two.bar', content: 'D' }
      ],
      'three.baz': [
        { tag: 'three.baz', content: 'E' },
        { tag: 'three.baz', content: 'F' }
      ],
    });
  });

  it('should create groups based on numeric values of the specified property', () => {
    let arr = [
      { tag: 1, content: 'A' },
      { tag: 1, content: 'B' },
      { tag: 2, content: 'C' },
      { tag: 2, content: 'D' },
      { tag: 3, content: 'E' },
      { tag: 3, content: 'F' }
    ];

    let actual = groupArray(arr, 'tag');

    assert.deepEqual(actual, {
      '1': [
        { tag: 1, content: 'A' },
        { tag: 1, content: 'B' }
      ],
      '2': [
        { tag: 2, content: 'C' },
        { tag: 2, content: 'D' }
      ],
      '3': [
        { tag: 3, content: 'E' },
        { tag: 3, content: 'F' }
      ],
    });
  });

  it('should create groups based on boolean values of the specified property', () => {
    let arr = [
      { tag: true, content: 'A' },
      { tag: false, content: 'B' },
      { tag: true, content: 'C' },
      { tag: false, content: 'D' },
      { tag: true, content: 'E' },
      { tag: false, content: 'F' }
    ];

    let actual = groupArray(arr, 'tag');

    assert.deepEqual(actual, {
      'true': [
        { tag: true, content: 'A' },
        { tag: true, content: 'C' },
        { tag: true, content: 'E' },
      ],
      'false': [
        { tag: false, content: 'B' },
        { tag: false, content: 'D' },
        { tag: false, content: 'F' }
      ]
    });
  });

  it('should support passing the property as an array:', () => {
    let arr = [
      { tag: 'one', content: 'A' },
      { tag: 'one', content: 'B' },
      { tag: 'two', content: 'C' },
      { tag: 'two', content: 'D' },
      { tag: 'three', content: 'E' },
      { tag: 'three', content: 'F' }
    ];

    let actual = groupArray(arr, ['tag']);

    assert.deepEqual(actual, {
      one: [
        { tag: 'one', content: 'A' },
        { tag: 'one', content: 'B' }
      ],
      two: [
        { tag: 'two', content: 'C' },
        { tag: 'two', content: 'D' }
      ],
      three: [
        { tag: 'three', content: 'E' },
        { tag: 'three', content: 'F' }
      ],
    });
  });

  it('should create groups based on the value of nested properties', () => {
    let arr = [
      { data: { tag: 'one' }, content: 'A' },
      { data: { tag: 'one' }, content: 'B' },
      { data: { tag: 'two' }, content: 'C' },
      { data: { tag: 'two' }, content: 'D' },
      { data: { tag: 'three' }, content: 'E' },
      { data: { tag: 'three' }, content: 'F' }
    ];

    let actual = groupArray(arr, 'data.tag');

    assert.deepEqual(actual, {
      one: [
        { data: { tag: 'one' }, content: 'A' },
        { data: { tag: 'one' }, content: 'B' }
      ],
      two: [
        { data: { tag: 'two' }, content: 'C' },
        { data: { tag: 'two' }, content: 'D' }
      ],
      three: [
        { data: { tag: 'three' }, content: 'E' },
        { data: { tag: 'three' }, content: 'F' }
      ],
    });
  });

  it('should create groups based on numeric values of nested properties', () =>{
    let arr = [
      { data: { tag: 1 }, content: 'A' },
      { data: { tag: 1 }, content: 'B' },
      { data: { tag: 2 }, content: 'C' },
      { data: { tag: 2 }, content: 'D' },
      { data: { tag: 3 }, content: 'E' },
      { data: { tag: 3 }, content: 'F' }
    ];

    let actual = groupArray(arr, 'data.tag');

    assert.deepEqual(actual, {
      1: [
        { data: { tag: 1}, content: 'A' },
        { data: { tag: 1}, content: 'B' }
      ],
      2: [
        { data: { tag: 2}, content: 'C' },
        { data: { tag: 2}, content: 'D' }
      ],
      3: [
        { data: { tag: 3}, content: 'E' },
        { data: { tag: 3}, content: 'F' }
      ],
    });
  });

  it('should create groups from properties with object values:', () => {
    let arr = [
      { data: { categories: { one: ['one'], four: ['five', 'six'] }}, content: 'A' },
      { data: { categories: { one: ['one'] }}, content: 'B' },
      { data: { categories: { one: ['two'], four: ['five', 'six'] }}, content: 'C' },
      { data: { categories: { two: ['two'], four: ['five', 'six'] }}, content: 'D' },
      { data: { categories: { two: ['three'], four: ['five', 'six'] }}, content: 'E' },
      { data: { categories: { two: ['three'] }}, content: 'F' }
    ];

    function getChildren(prop) {
      return function(obj) {
        let val = get(obj, prop);

        forOwn(val, arr => {
          arr.forEach(key => {
            union(this, key, [obj]);
          });
        });
      };
    }

    let actual = groupArray(arr, 'data.categories', getChildren('data.categories'));
    assert.deepEqual(Object.keys(actual), ['one', 'four', 'two']);
  });

  it('should create groups and ignore objects without matching property values:', () => {
    let arr = [
      { tag: 'one', content: 'A' },
      {content: 'B' },
      { tag: 'two', content: 'C' },
      {content: 'D' },
      { tag: 'three', content: 'E' },
      {content: 'F' }
    ];

    let actual = groupArray(arr, 'tag');

    assert.deepEqual(actual, {
      one: [
        { tag: 'one', content: 'A' }
      ],
      two: [
        { tag: 'two', content: 'C' }
      ],
      three: [
        { tag: 'three', content: 'E' }
      ],
    });
  });

  it('should support properties with array values:', () => {
    let fixture = require('./fixtures/tags-array.js');
    let actual = groupArray(fixture, 'tags');
    assert.deepEqual(actual, require('./expected/tags-array.js'));
  });

  it('should group nested properties with array values that are created by a function:', () => {
    let fixture = require('./fixtures/categories-tags.js');
    let actual = groupArray(fixture, 'categories', function(val, key) {
      return val.categories[key];
    });
    assert.deepEqual(actual, require('./expected/categories-tags.js'));
  });

  it('should create multiple, nested groups:', () => {
    let fixture = require('./fixtures/nested.js');
    let actual = groupArray(fixture, 'data.tag', 'data.month');
    assert.deepEqual(actual, require('./expected/nested.js'));
  });

  it('should create multiple, deeply nested groups:', () => {
    let fixture = require('./fixtures/deeply-nested.js');
    let actual = groupArray(fixture, 'data.tag', 'data.month', 'data.day');
    assert.deepEqual(actual, require('./expected/deeply-nested.js'));
  });

  it('should use a function create nested groups for multiple properties:', () => {
    let fixture = require('./fixtures/date-function.js');
    let actual = groupArray(fixture, 'data.tag', function(obj) {
      let date = obj.data.date.split('-');
      obj.data.month = date[0];
      obj.data.day = date[1];
      delete obj.data.date;
      return obj.data.month;
    }, function(obj) {
      return obj.data.day;
    });

    assert.deepEqual(actual, require('./expected/deeply-nested.js'));
  });

  it('should create multiple, insanely nested groups:', () => {
    let fixture = require('./fixtures/insanely-nested.js');
    let actual = groupArray(fixture, 'data.year', 'data.tag', 'data.month', 'data.day');
    assert.deepEqual(actual, require('./expected/insanely-nested.js'));
  });

  it('should support properties as an array:', () => {
    let fixture = require('./fixtures/insanely-nested.js');
    let actual = groupArray(fixture, ['data.year', 'data.tag', 'data.month', 'data.day']);
    assert.deepEqual(actual, require('./expected/insanely-nested.js'));
  });
});

describe('issues', () => {
  it('#10 should group keys with double quotes in the values', () => {
    let fixture = require('./fixtures/issue-10.js');
    let actual = groupArray(fixture, 'tagKey');
    assert.deepEqual(actual, require('./expected/issue-10.js'));
  });

  it('#11 should group keys with an dot at the end', () => {
    let fixture = [{ name: 'foo', value: 1}, { name: 'foo.bar.', value: 2 }];
    let expected = {
      foo: [{ name: 'foo', value: 1 }],
      'foo.bar.': [{ name: 'foo.bar.', value: 2 }]
    };

    let actual = groupArray(fixture, 'name');
    assert.deepEqual(actual, expected);
  });
});
