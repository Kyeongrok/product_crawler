const fs = require('fs');

const data = fs.readFileSync('../../test_data/digitec/2017-09-04.txt');

const string = data.toString();
const found = string.replace(/dataLayer.push\(/m, '').replace(/\);/m, '').replace(/\\/m, '');

console.log(found.match(''));
console.log(found);

// console.log(targetString);
