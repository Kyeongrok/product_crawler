const request = require('request');
const cheerio = require('cheerio');

const paginationRequestOptions = {
    method: 'GET',
    uri: 'https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?page=',
    headers: {'User-Agent': 'Mozilla/5.0'},
};

function paginationParse(index) {
    requestOptions = paginationRequestOptions;
    requestOptions["uri"] = requestOptions["uri"] + index
    console.log(requestOptions)
    request(request_options, function (error, response, html) {
        if (error) {
            throw error;
        }
        // console.log(html);

        // load website
        const $ = cheerio.load(html);
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

const parse = () => {
    console.log('brackParser');
    const baseRequestOptions = {
        method: 'GET',
        uri: 'https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };

    var total_item;

    return new Promise((resolve) => {
        let result = {list: []};
        request(baseRequestOptions, function (error, response, html) {
            if (error) {
                throw error;
            }
            // console.log(html);

            // load website
            var $ = cheerio.load(html);

            // find total number of item
            $('.Count').each(function (index, elem) {
                total_item = Number($(this).text().split('Treffer')[0].replace(/\s/g, ''));
                console.log(total_item);
            })
        });


        for (var i = 0; i < total_item / 20; i++) {
            paginationParse(i + 1);
            console.log(i + 1);
        }


        resolve(result);
    });
}

module.exports.parse = parse;



