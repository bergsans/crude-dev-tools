const { fmtStr, purify } = require('crude-dev-tools');

const coloredString = fmtStr('Hello, world!', 'blue');
console.log('With color: ', coloredString);

console.log('Purified: ', purify(coloredString));
