module.exports = { one:
   { A:
      [ { categories: { one: [ 'A' ] },
          name: 'Post 1',
          content: 'Post 1',
          key: 'post-1.md' },
        { categories: { one: [ 'A' ], two: [ 'B', 'C' ] },
          name: 'Post 2',
          content: 'Post 2',
          key: 'post-2.md' } ],
     B:
      [ { categories: { one: [ 'B' ], two: [ 'C', 'D' ] },
          name: 'Post 3',
          content: 'Post 3',
          key: 'post-3.md'} ] },
  two:
   { B:
      [ { categories: { one: [ 'A' ], two: [ 'B', 'C' ] },
          name: 'Post 2',
          content: 'Post 2',
          key: 'post-2.md' } ],
     C:
      [ { categories: { one: [ 'A' ], two: [ 'B', 'C' ] },
          name: 'Post 2',
          content: 'Post 2',
          key: 'post-2.md' },
        { categories: { one: [ 'B' ], two: [ 'C', 'D' ] },
          name: 'Post 3',
          content: 'Post 3',
          key: 'post-3.md' } ],
     D:
      [ { categories: { one: [ 'B' ], two: [ 'C', 'D' ] },
          name: 'Post 3',
          content: 'Post 3',
          key: 'post-3.md' } ] },
  three:
   { B:
      [ { categories: { three: [ 'B' ], four: [ 'E', 'F', 'G' ] },
          name: 'Post 4',
          content: 'Post 4',
          key: 'post-4.md' } ] },
  four:
   { E:
      [ { categories: { three: [ 'B' ], four: [ 'E', 'F', 'G' ] },
          name: 'Post 4',
          content: 'Post 4',
          key: 'post-4.md' } ],
     F:
      [ { categories: { three: [ 'B' ], four: [ 'E', 'F', 'G' ] },
          name: 'Post 4',
          content: 'Post 4',
          key: 'post-4.md' },
        { categories: { four: [ 'C', 'F' ] },
          name: 'Post 5',
          content: 'Post 5',
          key: 'post-5.md' },
        { categories: { four: [ 'F', 'G' ] },
          name: 'Post 6',
          content: 'Post 6',
          key: 'post-6.md' } ],
     G:
      [ { categories: { three: [ 'B' ], four: [ 'E', 'F', 'G' ] },
          name: 'Post 4',
          content: 'Post 4',
          key: 'post-4.md' },
        { categories: { four: [ 'F', 'G' ] },
          name: 'Post 6',
          content: 'Post 6',
          key: 'post-6.md' } ],
     C:
      [ { categories: { four: [ 'C', 'F' ] },
          name: 'Post 5',
          content: 'Post 5',
          key: 'post-5.md' } ] } };
