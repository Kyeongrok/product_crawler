const cheerio = require('cheerio');
const urlStringGetter = require('../parser/common/urlStringGetter');

const extractRawDomList = (string) => {
  const $ = cheerio.load(string);
  const productContent = $('.product-content');

  return productContent;
}


const getProductInfo = (productContent) => {
  const productInfo = {};
  const currency = productContent.children[1].children[1].children[0].data;
  const price = productContent.children[1].children[2].data.replace(/(\.–)| |Rabatt/g, '');
  const name = productContent.children[3].children[2].data.replace(/[\r\n]/g, '');
  productInfo.currency = currency;
  productInfo.price = price;
  productInfo.name = name;

  if (productContent.children[1].children.length === 4) {
    const appendix = productContent.children[1].children[3].children[0].data;
    productInfo.price = appendix.replace(/[(statt vorher)–\\.]/g, '');
    productInfo.appendix = price;
  }
  return productInfo;
};

const parse = () =>{
  return new Promise(resolve => {
    urlStringGetter.getStringFromUrl('https://www.digitec.ch/de/s1/producttype/tv-4?tagIds=538&take=300')
      .then(string => {
        return extractRawDomList(string);
      })
      .then(rawDomList => {
        const result = { status: 'ok', list: [] };
        for (let i = 0; i < rawDomList.length; i += 1) {
          result.list.push(getProductInfo(rawDomList[i]));
        }
        return result;
      })
      .then(result => resolve(result))
      .catch((error) => {
        console.log(error);
      });
  })
}


module.exports.parse = parse;

