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

module.exports.getProductInfo = getProductInfo;
