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
                let totalNumber = Number($(this).text().split('Treffer')[0].replace(/\s/g, ''));
                // console.log(totalNumber);
                resolve(totalNumber)
            })
        });
    });
}

const subItemParse = (href) => {
    // console.log("subItemParse");
    const requestOptions = {
        method: 'GET',
        uri: 'https://www.brack.ch',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };
    requestOptions['uri'] += href;
    return new Promise((resolve, reject) => {
        request(requestOptions, function (error, response, html) {
            if (error) {
                // throw error;
                reject(error);
            }
            //console.log(requestOptions["uri"]);

            // load website
            const $ = cheerio.load(html);

            const productionInfo = {list: []};
            $('.productStage__infoColumn').each(function (index, elem) {
                brand = $(this).children('div').children('span.productStage__itemManufacturer').text();
                name = $(this).children('div').children('h1').text();
                label = $(this).children('div').children('div').children('div').children('p').children('span.productStage__variants__label').text();
                price = $(this).children('div').children('div').children('p').children('span.price').children('em').text();
                //console.log(brand + " " + name);
                //console.log(label);
                //console.log(price);
                productionInfo.name = brand + " " + name;
                productionInfo.appendix = price.replace(/[^0-9]/g,"");
                productionInfo.inch = label;
            });
            //console.log(productionInfo);
            resolve(productionInfo);
        });
    });
}

const subParse = (index) => {
    // console.log("subParse");
    const requestOptions = {
        method: 'GET',
        uri: 'https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?page=',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };
    requestOptions['uri'] += index;
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
                // console.log($(this).text());
                brand = $(this).children('div').children('a').children('span.productList__itemManufacturer').text();
                name = $(this).children('div').children('a').children('span.productList__itemTitle').text();
                price = $(this).children('div').children('a').children('div').children('div').children('em').text().replace(/\s/g, '');
                productionList = $(this).children('div').children('a').children('div.productList__itemVariant');

                itemLength = $(this).children('div').children('a').children('div.productList__itemVariant').children('ul').find('li').length;
                item = $(this).children('div').children('a').children('div.productList__itemVariant').children('ul').find('li');

                if (itemLength == 0) { // 한개인 경우
                    if (price) {
                        const productionInfo = {list: []};
                        productionInfo.name = brand + " " + name;
                        productionInfo.appendix = price.replace(/[^0-9]/g,"");
                        //console.log(productionInfo);
                        result.push(productionInfo);
                    }
                } else {
                    hrefs = [];
                    var num = 0;
                    item.each(function (index, elem) {
                        // console.log( $(elem).attr('data-href') );
                        href = $(elem).attr('data-href');
                        //promises.push(subItemParse(href));
                        result.push(href);
                        num += 1;
                    });
                    //console.log(num);
                    /*
                    Promise.all(promises)
                        .then((data) => {
                            // console.log(data);
                            for (var i = 0; i < num; i++) {
                                //console.log(data[i]);
                                result.push(data[i]);
                            }
                            //resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        })
                    */
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
                for (let i = 1; i < max; i++) {
                    promises.push(subParse(i));
                }
                let result = [];
                Promise.all(promises)
                    .then((data) => {
                        //console.log(data);
                        //result.concat(data);

                        for (let i = 0; i < max - 1; i++) {
                            //console.log(data[i]);
                            result = result.concat(data[i]);
                        }
                        resolve(result);

                    })
                    .catch((error) => {
                        reject(error);
                    })

            })
            .catch((error) => {
                reject(error);
            })

    }).then(data => {
        //console.log(data);
        return new Promise((resolve, reject) => {
            const result = []

            promises = [];
            itemNum = 0;
            for (let i = 0; i < data.length; i++) {
                if (typeof data[i] == 'string') {
                    promises.push(subItemParse(data[i]));
                    itemNum += 1;
                } else {
                    result.push(data[i]);
                }
            }
            console.log(itemNum);
            Promise.all(promises)
                .then((data) => {
                    for (let i = 0; i < itemNum; i++) {
                        // console.log(data[i]);
                        result.push(data[i]);
                    }
                    resolve(result);
                })
        });
    });
}

module.exports.parse = parse;



