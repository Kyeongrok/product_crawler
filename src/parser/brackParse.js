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
            var $ = cheerio.load(html);

            // find total number of item
            $('.Count').each(function (index, elem) {
                var totalNumber = Number($(this).text().split('Treffer')[0].replace(/\s/g, ''));
                // console.log(totalNumber);
                resolve(totalNumber)
            })
        });
    });
}

const subParse = (index, max) => {
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

            if (index >= max) {
                console.log("reject")
                reject(error);
            } else {
                // console.log(html);
                console.log(index, max);
                console.log(requestOptions);
                // load website
                let list = []
                const $ = cheerio.load(html);
                $('.productList__item').each(function (index, elem) {
                    //console.log($(this).text());
                    brand = $(this).children('div').children('a').children('span.productList__itemManufacturer').text();
                    name = $(this).children('div').children('a').children('span.productList__itemTitle').text();
                    //console.log(name);
                    price = $(this).children('div').children('a').children('div').children('div').children('em').text().replace(/\s/g, '');

                    const productionInfo = {list: []};
                    if (price) {
                        productionInfo.name = brand + " " + name;
                        productionInfo.appendix = price;
                        list.push(productionInfo);
                    }

                    //console.log(brand);
                    //console.log(name);
                    //console.log(price);
                })
                resolve(index);

                index += 1;
                subParse(index, max)
                    .then((index) => {
                        //console.log(list);
                        //result.push(list);
                    })
                    .catch((error) => {
                        // reject(error);
                        console.log("error")
                        // resolve(result);
                    });

            }
        });
    });
}

const parse = () => {
    console.log('brackParser');

    return new Promise((resolve, reject) => {
        getTotalNumber()
            .then((totalNumber) => {
                console.log(totalNumber);

                let result = {list: []};
                let index = 1;
                const max = (totalNumber / 20) + 1;

                subParse(index, max)
                    .then((index) => {
                        //console.log(list);
                        //result.push(list);
                    })
                    .catch((error) => {
                        // reject(error);
                        console.log("error")
                        // resolve(result);
                    });
            })
            .catch((error) => {
                reject(error);
            })

    });
}

module.exports.parse = parse;



