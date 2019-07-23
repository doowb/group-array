module.exports = {
  '/"jsb":s*[/gi/]/gi': [
    {
      file: '<File "lib.js">',
      ext: 'js',
      startTag: /"js\b":\s*\[/gi,
      endTag: /\]/gi,
      tagKey: '/"js\\b":\\s*\\[/gi/\\]/gi'
    },
    {
      file: '<File "lib2.js">',
      ext: 'js',
      startTag: /"js\b":\s*\[/gi,
      endTag: /\]/gi,
      tagKey: '/"js\\b":\\s*\\[/gi/\\]/gi'
    }
  ],
  '/"htmlb":s*[/gi/]/gi': [
    {
      file: '<File "component.html">',
      ext: 'html',
      startTag: /"html\b":\s*\[/gi,
      endTag: /\]/gi,
      tagKey: '/"html\\b":\\s*\\[/gi/\\]/gi'
    }
  ],
  '/"cssb":s*[/gi/]/gi': [
    {
      file: '<File "styles.css">',
      ext: 'css',
      startTag: /"css\b":\s*\[/gi,
      endTag: /\]/gi,
      tagKey: '/"css\\b":\\s*\\[/gi/\\]/gi'
    }
  ]
};