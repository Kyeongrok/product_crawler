const request = require('request');
const cheerio = require('cheerio');

const getTotalNumber = () => {
    console.log('getTotalNumber');
    const baseRequestOptions = {
        method: 'GET',
        uri: 'https://www.alltron.ch/ce/tv-home-cinema/tv/tv?',
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
            var $ = cheerio.load(html);

            // find total number of item
            $('.searchTitle').each(function (index, elem) {
                var totalNumber = Number($(this).children('h2').children('span').text().split('Ergebnisse')[0].replace(/\s/g, ''));
                // console.log(totalNumber);
                resolve(totalNumber)
            })
        });
    });
}

const subParser = (index) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://www.alltron.ch/ce/tv-home-cinema/tv/tv?page=',
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
            // console.log('success');

            // load website
            const $ = cheerio.load(html);

            const result = []
            $('.box1.teaserSmallImageWide.productListResultItem').each(function (index, elem) {
                //console.log($(this).text());
                const name = $(this).children('div').children('div').children('h3').children('a').text();
                const price = $(this).children('div').children('div').children('div').children('span.price').text().replace(/\s/g, '');
                const productInfo = {list: []};
                if (price) {
                    //console.log(name);
                    //console.log(price);
                    productInfo.name = name;
                    productInfo.price = price;
                    result.push(productInfo);
                }
            });
            //console.log(result);
            resolve(result);
            //console.log("request end")
        });
    });
}


const parse = () => {
    console.log('alltronParser');

    return new Promise((resolve, reject) => {
        getTotalNumber()
            .then((totalNumber) => {
                //console.log(totalNumber);

                const max = (totalNumber / 50) + 1;
                promises = [];
                for (var index = 1; index < max; index++) {
                    promises.push(subParser(index));
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
