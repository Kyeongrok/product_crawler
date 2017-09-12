const request = require('request');
const cheerio = require('cheerio');


const parse = () => {
  console.log('conformaParser');
  const baseRequestOptions = {
    method: 'GET',
    uri: 'http://www.conforama.ch/rayon3_high-tech_tv--video---home-cinema_televisions-led_10051_10601_-16_42073_42119_42110',
    headers: {'User-Agent': 'Mozilla/5.0'},
  };

  return new Promise((resolve) => {
      request(baseRequestOptions, function (error, response, html) {
        if (error) {
          throw error;
        }

        console.log('success');
        // load website
        const $ = cheerio.load(html);

        // find total number of item
        let result = {list:[]};
        $('.designProd').each(function(index, elem) {
          //console.log($(this).text());
          const name = $(this).children('a').children('span').text().replace(/\s/g, '');
          // console.log(name);
          const old = $(this).children('span.priceStrike').text();
          const price = $(this).children('span.price').text();
          const productInfo = {list:[]};
          if (price) {
            productInfo.name = name;
            productInfo.appendix = price; // 세일가
            productInfo.price = old;  // 기본가
            result.list.push(productInfo);
          }
        });
        resolve(result);
        //console.log("request end")
      });


  });
}

module.exports.parse = parse;