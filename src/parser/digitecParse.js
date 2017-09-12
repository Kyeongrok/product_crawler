const client = require('cheerio-httpcli');

const getProductInfo = (productContent) => {
  const productInfo = {};
  const currency = productContent.children[1].children[1].children[0].data;
  const price = productContent.children[1].children[2].data;
  const name = productContent.children[3].children[2].data;
  productInfo.currency = currency;
  productInfo.price = price.replace(/[ –\\.]/g, '');
  productInfo.name = name.replace(/[\r\n]/g, '');

  if (productContent.children[1].children.length === 4) {
    const appendix = productContent.children[1].children[3].children[0].data;
    productInfo.appendix = appendix.replace(/[(statt vorher)–\\.]/g, '');
  }
  return productInfo;
};

const parse = () => {
  const string = client.fetchSync('https://www.digitec.ch/de/s1/producttype/tv-4?tagIds=538&take=10');
  const productContent = string.$('.product-content');

  const result = { status: 'ok', list: [] };
  for (let i = 0; i < productContent.length; i += 1) {
    result.list.push(getProductInfo(productContent[i]));
  }

  return result;
}

export default parse();
