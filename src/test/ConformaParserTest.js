const client = require('cheerio-httpcli');

const digitecParser = require('../parser/DigitecParser');

const string = client.fetchSync('http://www.conforama.ch/webapp/wcs/stores/servlet/ProductListDisplayCmd?storeId=10051&langId=-16&catalogId=10601&colType=2&loadFromPrediggoCategoryPage=true&action=1&universeId=42073&segmentId=42119&marketId=42110&refiningId=page%3d1%26nbResultsPerPage%3d10000%26sorting%3dMY_SELECTION%26constraints%3dprice%3a%5b50.0%2c100.0)_%2f_marche-segment%3aTV%2c+Vid%C3%A9o+%26+home+cin%C3%A9ma+%2f+T%C3%A9l%C3%A9visions+LED_%2f_price%3a%5b100.0%2c500.0)');
console.log(string.body);


