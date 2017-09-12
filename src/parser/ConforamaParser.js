const baseUrl = 'http://www.conforama.ch/rayon3_high-tech_tv--video---home-cinema_televisions-led_10051_10601_-16_42073_42119_42110';

const request = require('request');
const cheerio = require('cheerio');

let baseRequestOptions = {
    method: 'GET',
    uri: baseUrl,
    headers: {'User-Agent': 'Mozilla/5.0'},
};

let getMybody = () => {
  request(baseRequestOptions, function (error, response, html) {
    if (error) {
      throw error;
    }
    // console.log(html);

    // load website
    let $ = cheerio.load(html);

    // find total number of item
    $('.designProd').each(function (index, elem) {
      //console.log($(this).text());
      let name = $(this).children('a').children('span').text().replace(/\s/g, '');
      // console.log(name);
      let old = $(this).children('span.priceStrike').text();
      let price = $(this).children('span.price').text();
      if (price) {
        console.log(name);
        console.log(price);
        console.log(old);
      }
    })
    //console.log("request end")
  });

}

getMybody();