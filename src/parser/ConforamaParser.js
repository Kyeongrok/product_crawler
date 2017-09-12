const base_url = 'http://www.conforama.ch/rayon3_high-tech_tv--video---home-cinema_televisions-led_10051_10601_-16_42073_42119_42110';

const request = require('request');
const cheerio = require('cheerio');

var base_request_options = {
    method: 'GET',
    uri: base_url,
    headers: {'User-Agent': 'Mozilla/5.0'},
};

request(base_request_options, function (error, response, html) {
    if (error) {
        throw error;
    }
    // console.log(html);

    // load website
    var $ = cheerio.load(html);

    // find total number of item
    $('.designProd').each(function (index, elem) {
        //console.log($(this).text());
        name = $(this).children('a').children('span').text().replace(/\s/g, '');
        // console.log(name);
        old = $(this).children('span.priceStrike').text();
        price = $(this).children('span.price').text();
        if (price) {
            console.log(name);
            console.log(price);
            console.log(old);
        }
    })
    //console.log("request end")
});