const util = require('util');
const groupArray = require('..');
let arr = [
  {
    categories: { one: ['A'] },
    name: 'Post 1',
    content: 'Post 1',
    key: 'post-1.md'
  },
  {
    categories: { one: ['A'], two: ['B', 'C'] },
    name: 'Post 2',
    content: 'Post 2',
    key: 'post-2.md'
  },
  {
    categories: { one: ['B'], two: ['C', 'D'] },
    name: 'Post 3',
    content: 'Post 3',
    key: 'post-3.md'
  },
  {
    categories: { three: ['B'], four: ['E', 'F', 'G'] },
    name: 'Post 4',
    content: 'Post 4',
    key: 'post-4.md'
  },
  {
    categories: { four: ['C', 'F'] },
    name: 'Post 5',
    content: 'Post 5',
    key: 'post-5.md'
  },
  {
    categories: { four: ['F', 'G'] },
    name: 'Post 6',
    content: 'Post 6',
    key: 'post-6.md'
  }
];

function createTags(items) {
  items.forEach(obj => {
    obj.tags = [];
    for (let key in obj.categories) {
      if (obj.categories.hasOwnProperty(key)) {
        let tags = obj.categories[key];
        tags.forEach(tag => {
          if (obj.tags.indexOf(tag) === -1) {
            obj.tags.push(tag);
          }
        });
      }
    }
  });
  return items;
}

let res = groupArray(createTags(arr), 'categories', 'tags');
console.log(util.inspect(res, null, 10));
