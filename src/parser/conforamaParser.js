const request = require('request');
const cheerio = require('cheerio');

const parser = (url) => {
    const baseRequestOptions = {
        method: 'GET',
        url: url,
        headers: {'User-Agent': 'Mozilla/5.0'},
    };
    console.log('request to conforma');

    return new Promise((resolve, reject) => {
        request(baseRequestOptions, function (error, response, html) {
            if (error) {
                reject(error);
            }
            const $ = cheerio.load(html);

            let result = [];
            console.log($('.designProd').length);

            $('.designProd').each((index, elem) => {
                const name = $(elem).children('a').children('span').text().replace(/\s/g, '');
                const old = $(elem).children('span.priceStrike').text().replace(/[^0-9]/g, ''); // 가격
                const price = $(elem).children('span.price').text().replace(/[^0-9]/g, '');    // 세일가

                const productInfo = {};
                if (old) {
                    productInfo.name = name;
                    productInfo.appendix = price; // 세일가
                    productInfo.price = old;  // 기본가
                } else if (price) {
                    productInfo.name = name;
                    productInfo.price = price;  // 세일가
                } else {
                    productInfo.name = name;
                    productInfo.appendix = price; // 세일가
                    productInfo.price = old;  // 기본가
                }
                result.push(productInfo);
            });
            resolve(result);
        })
    })
}

const parse = () => {
    return new Promise((resolve, reject) => {
        const tvList = ['http://www.conforama.ch/rayon3_high-tech_tv--video---home-cinema_televisions-led_10051_10601_-16_42073_42119',
            'http://www.conforama.ch/rayon3_high-tech_tv--video---home-cinema_televisions-oled_10051_10601_-16_42073_294635',
            'http://www.conforama.ch/rayon3_high-tech_tv--video---home-cinema_televisions-qled_10051_10601_-16_42073_357635'];
        const promises = [];
        //console.log(tvList.length);
        for (let i = 0; i < tvList.length; i++) {
            //console.log(tvList[i]);
            promises.push(parser(tvList[i]));
        }
        const result = {status: 'ok', list: []};
        Promise.all(promises)
            .then((data) => {
                for (let i = 0; i < tvList.length; i++) {
                    result.list = result.list.concat(data[i]);
                }
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

module.exports.parse = parse;