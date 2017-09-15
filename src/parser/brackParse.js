const request = require('request');
const cheerio = require('cheerio');

const getTotalNumber = () => {
    console.log('getTotalNumber');
    const baseRequestOptions = {
        method: 'GET',
        uri: 'https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };

    return new Promise((resolve, reject) => {
        request(baseRequestOptions, function (error, response, html) {
            if (error) {
                // throw error;
                reject(error);
            }
            // console.log(html);
            // console.log('success');

            // load website
            const $ = cheerio.load(html);

            // find total number of item
            $('.Count').each(function (index, elem) {
                var totalNumber = Number($(this).text().split('Treffer')[0].replace(/\s/g, ''));
                // console.log(totalNumber);
                resolve(totalNumber)
            })
        });
    });
}

const subParse = (index) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?page=',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };
    requestOptions["uri"] += index
    //console.log(requestOptions)
    return new Promise((resolve, reject) => {
        request(requestOptions, function (error, response, html) {
            if (error) {
                // throw error;
                reject(error);
            }
            // console.log(html);
            // console.log('success');

            // load website
            const $ = cheerio.load(html);

            const result = []
            $('.productList__item').each(function (index, elem) {
                //console.log($(this).text());
                brand = $(this).children('div').children('a').children('span.productList__itemManufacturer').text();
                name = $(this).children('div').children('a').children('span.productList__itemTitle').text();
                price = $(this).children('div').children('a').children('div').children('div').children('em').text().replace(/\s/g, '');

                const productionInfo = {list: []};
                if (price) {
                    productionInfo.name = brand + " " + name;
                    productionInfo.appendix = price;
                    result.push(productionInfo);
                }
            });
            //console.log(result);
            resolve(result);
            //console.log("request end")
        });
    });
}

const parse = () => {
    console.log('brackParser');

    return new Promise((resolve, reject) => {
        getTotalNumber()
            .then((totalNumber) => {
                console.log(totalNumber);

                const max = (totalNumber / 20) + 1;
                promises = [];
                for (var i = 1; i < max; i++) {
                    promises.push(subParse(i));
                }
                let result = [];
                Promise.all(promises)
                    .then((data) => {
                        //console.log(data);
                        //result.concat(data);
                        for (var i = 0; i < max - 1; i++) {
                            //console.log(data[i]);
                            result = result.concat(data[i]);
                        }
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(error);
                    })

            })
            .catch((error) => {
                reject(error);
            })

    });
}

module.exports.parse = parse;



