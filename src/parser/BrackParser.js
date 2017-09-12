const base_url = 'https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?';
const pagination_url = 'https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?page=';

const request = require('request');
const cheerio = require('cheerio');

var base_request_options = {
    method: 'GET',
    uri: base_url,
    headers: {'User-Agent': 'Mozilla/5.0'},
};

var _total_item;

request(base_request_options, function (error, response, html) {
    if (error) {
        throw error;
    }
    // console.log(html);

    // load website
    var $ = cheerio.load(html);

    // find total number of item
    $('.Count').each(function (index, elem) {
        _total_item = Number($(this).text().split('Treffer')[0].replace(/\s/g, ''));
        console.log(_total_item );
    })
});

var pagination_request_options = {
    method: 'GET',
    uri: base_url,
    headers: {'User-Agent': 'Mozilla/5.0'},
};

function parser(index) {
    request_options = pagination_request_options;
    request_options["uri"] = pagination_url + index
    console.log(request_options)
    request(request_options, function (error, response, html) {
        if (error) {
            throw error;
        }
        // console.log(html);

        // load website
        var $ = cheerio.load(html);
        $('.productList__item').each(function (index, elem) {
            //console.log($(this).text());
            brand = $(this).children('div').children('a').children('span.productList__itemManufacturer').text();
            name = $(this).children('div').children('a').children('span.productList__itemTitle').text();
            // console.log(name);
            price = $(this).children('div').children('a').children('div').children('div').children('em').text().replace(/\s/g, '');
            console.log(brand);
            console.log(name);
            console.log(price);
        })
    })
};

setTimeout(function () {
    //console.log(_total_item);

    for (var i = 0; i < _total_item / 20; i++) {
        parser(i+1);
        //console.log(i*15);
    }
}, 10000);