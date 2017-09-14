const base_url = 'https://www.alltron.ch/ce/tv-home-cinema/tv/tv?';
const pagination_url = 'https://www.alltron.ch/ce/tv-home-cinema/tv/tv?page=';
const request = require('request');
const cheerio = require('cheerio');

var baseRequestOptions = {
    method: 'GET',
    uri: base_url,
    headers: {'User-Agent': 'Mozilla/5.0'},
};

var _total_item;

request(baseRequestOptions, function (error, response, html) {
    if (error) {
        throw error;
    }
    // load website
    var $ = cheerio.load(html);

    // find total number of item
    $('.searchTitle').each(function (index, elem) {
        _total_item = Number($(this).children('h2').children('span').text().split('Ergebnisse')[0].replace(/\s/g, ''));
        console.log(_total_item );
    })
});

const parser = (index) => {
    const requestOptions = {
      method: 'GET',
      uri: base_url,
      headers: {'User-Agent': 'Mozilla/5.0'},
    };
    requestOptions["uri"] = pagination_url + index
    console.log(requestOptions)
    request(requestOptions, function (error, response, html) {
      if (error) {
        throw error;
      }

      // load website
      const $ = cheerio.load(html);
      const result = { status: 'ok', list: [] };
      $('.box1.teaserSmallImageWide.productListResultItem').each(function (index, elem) {
        //console.log($(this).text());
        const productName = $(this).children('div').children('div').children('h3').text();
        const productPrice = $(this).children('div').children('div').children('div').children('span.price').text().replace(/\s/g, '');

        result.list.push({name:productName, price:productPrice, appendix:""});
      });
      console.log(result);

    })
};

setTimeout(function () {
    //console.log(_total_item);

    for (var i = 0; i < _total_item / 50; i++) {
        parser(i+1);
    }
}, 10000);
