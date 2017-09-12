const client = require('cheerio-httpcli');

const digitecParser = require('../parser/DigitecParser');

const string = client.fetchSync('https://www.digitec.ch/de/s1/producttype/tv-4?tagIds=538&take=10');
const productContent = string.$('.product-content');

for (let i = 0; i < productContent.length; i += 1) {
  console.log(digitecParser.getProductInfo(productContent[i]));
}

