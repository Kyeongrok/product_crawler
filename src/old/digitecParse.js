const request = require('request');
const cheerio = require('cheerio');

const getProductInfo = (productContent) => {
  const productInfo = {};
  const currency = productContent.children[1].children[1].children[0].data;
  const price = productContent.children[1].children[2].data.replace(/[ –\\.]/g, '');
  const name = productContent.children[3].children[2].data.replace(/[\r\n]/g, '');
  productInfo.currency = currency;
  productInfo.price = price;
  productInfo.name = name;

  if (productContent.children[1].children.length === 4) {
    const appendix = productContent.children[1].children[3].children[0].data;
    productInfo.appendix = appendix.replace(/[(statt vorher)–\\.]/g, '');
  }
  return productInfo;
};

const parse = () => {
  console.log('digitec parse');

  let baseRequestOptions = {
    method: 'GET',
    uri: 'https://www.digitec.ch/de/s1/producttype/tv-4?tagIds=538&take=300',
    headers: {'User-Agent': 'Mozilla/5.0'},
  };

  return new Promise((resolve) => {
    console.log('request to digitec');
    request(baseRequestOptions, (error, response, html) => {
      if (error) {
        throw error;
      }
      console.log('request success');
      console.log(html);

      //jquery object로 변경
      let $ = cheerio.load(html);

      //jquery object에서 필요한 부분 list 추출
      const productContent = $('.product-content');
      const result = { status: 'ok', list: [] };
      for (let i = 0; i < productContent.length; i += 1) {
        console.log(productContent[i]);
        result.list.push(getProductInfo(productContent[i]));
      }
      resolve(result);
    });
  });

}

module.exports.parse = parse;
module.exports.getProductInfo = getProductInfo;
