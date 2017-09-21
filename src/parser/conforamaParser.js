const request = require('request');
const cheerio = require('cheerio');

const stringGetter = (resolve) =>{
  const baseRequestOptions = {
    method: 'GET',
    uri: 'http://www.conforama.ch/webapp/wcs/stores/servlet/ProductListDisplayCmd?storeId=10051&langId=-16&catalogId=10601&colType=2&loadFromPrediggoCategoryPage=true&action=1&universeId=42073&segmentId=42119&marketId=42110&refiningId=page%3d1%26nbResultsPerPage%3d10000%26sorting%3dMY_SELECTION%26constraints%3dmarche-segment%3aTV%2c+Vid%C3%A9o+%26+home+cin%C3%A9ma+%2f+T%C3%A9l%C3%A9visions+LED_%2f_segment%3aT%C3%A9l%C3%A9visions+OLED_%2f_segment%3aT%C3%A9l%C3%A9visions+QLED_%2f_segment%3aT%C3%A9l%C3%A9visions+LED',
    headers: {'User-Agent': 'Mozilla/5.0'},
  };
  console.log('request to conforma');
  request(baseRequestOptions, function (error, response, html) {
    if (error) throw error;
    console.log('success');
    resolve(html) ;
  });
}

const parser = (htmlString) => {
  const $ = cheerio.load(htmlString);
  let result = {list: []};
  console.log($('.designProd').length);

  $('.designProd').each((index, elem) => {
    const name = $(elem).children('a').children('span').text().replace(/\s/g, '');
    const old = $(elem).children('span.priceStrike').text().replace(/[^0-9]/g,''); // 가격
    const price = $(elem).children('span.price').text().replace(/[^0-9]/g,'');    // 세일가

    const productInfo = {};
    if (old) {
      productInfo.name = name;
      productInfo.appendix = price; // 세일가
      productInfo.price = old;  // 기본가
    } else if (price) {
      productInfo.name = name;
      productInfo.price = price;  // 세일가
    }else{
      productInfo.name = name;
      productInfo.appendix = price; // 세일가
      productInfo.price = old;  // 기본가
    }
    result.list.push(productInfo);
  });
  return result;
}

const parse = () => {
  return new Promise(stringGetter)
  .then(parser);
}

module.exports.parse = parse;