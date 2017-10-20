const request = require('request');
const cheerio = require('cheerio');

const subParse = (brand) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://www.melectronics.ch/de/c/550991303/tv-audio/fernseher/b/',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };
    requestOptions['uri'] += brand
    console.log(requestOptions.uri);

    console.log('subParse request to melectronics');

    return new Promise((resolve) => {
        request(requestOptions, function (error, response, html) {
            if (error) {
                throw error;
            }
            console.log('success');

            // load website
            const $ = cheerio.load(html);

            const result = []
            $('.tile--link.u-reset').each(function (index, elem) {
                //console.log($(this).text());
                const brand = $(this).children('section').children('div').children('h3.tile--title').text().replace(/\s/g, '');
                const name = $(this).children('section').children('div').children('div').children('p.tile--long-text').text().replace(/\s/g, '');
                // console.log(brand + " " + name);
                const old = $(this).children('section').children('div').children('div').children('span.price--discount').text(); // 가격
                const price = $(this).children('section').children('div').children('div').children('span').children('span.price--value').text(); // 세일가

                if (old) {
                    const productInfo = {};
                    productInfo.name = brand + " " + name;
                    productInfo.appendix = price.replace(/[^0-9]/g, ''); // 세일가
                    productInfo.price = old.replace(/[^0-9]/g, '');  // 기본가
                    result.push(productInfo);
                } else if (price) {
                    const productInfo = {};
                    productInfo.name = brand + " " + name;
                    productInfo.price = price.replace(/[^0-9]/g, '');  // 세일가
                    result.push(productInfo);
                }
            });
            resolve(result);
            //console.log("request end")
        });
    });
}

const parse = () => {
    console.log('melectronics');

    return new Promise((resolve, reject) => {
        const promises = [];
        brands = ['durabase', 'grundig', 'lg', 'panasonic', 'philips', 'samsung', 'sony', 'toshiba']
        for (let i = 0; i < brands.length; i++) {
            promises.push(subParse(brands[i]));
        }
        const result = {status: 'ok', list: []};
        Promise.all(promises)
            .then((data) => {
                //console.log(data);
                //result.concat(data);
                for (let i = 0; i < brands.length; i++) {
                    //console.log(data[i]);
                    result.list = result.list.concat(data[i]);
                }
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
    });
    console.log('request to m electronics');
}

module.exports.parse = parse;