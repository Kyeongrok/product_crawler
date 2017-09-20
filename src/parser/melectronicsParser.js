const request = require('request');
const cheerio = require('cheerio');

const parse = () => {
    console.log('melectronics');
    const baseRequestOptions = {
        method: 'GET',
        uri: 'https://www.melectronics.ch/de/c/550991303/tv-audio/fernseher?viewAll=true',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };

    console.log('request to m electronics');
    return new Promise((resolve) => {
        request(baseRequestOptions, function (error, response, html) {
            if (error) {
                throw error;
            }
            console.log('success');

            // load website
            const $ = cheerio.load(html);

            let result = {list: []};
            $('.tile--link.u-reset').each(function (index, elem) {
                //console.log($(this).text());
                const brand = $(this).children('section').children('div').children('h3.tile--title').text().replace(/\s/g, '');
                const name = $(this).children('section').children('div').children('div').children('p.tile--long-text').text().replace(/\s/g, '');
                // console.log(brand + " " + name);
                const old =  $(this).children('section').children('div').children('div').children('span.price--discount').text(); // 가격
                const price = $(this).children('section').children('div').children('div').children('span').children('span.price--value').text(); // 세일가

                if (old) {
                    const productInfo = {};
                    productInfo.name = brand + " " + name;
                    productInfo.appendix = price.replace(/[^0-9]/g,''); // 세일가
                    productInfo.price = old.replace(/[^0-9]/g,'');  // 기본가
                    result.list.push(productInfo);
                } else if (price) {
                    const productInfo = {};
                    productInfo.name = brand + " " + name;
                    productInfo.price = price.replace(/[^0-9]/g,'');  // 세일가
                    result.list.push(productInfo);
                }
            });
            resolve(result);
            //console.log("request end")
        });
    });
}

module.exports.parse = parse;