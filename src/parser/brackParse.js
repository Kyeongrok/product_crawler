const request = require('request');
const cheerio = require('cheerio');

const getTotalNumber = () => {
    console.log('subParser');
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

const getList = () => {
    console.log("getList");
    const paginationRequestOptions = {
        method: 'GET',
        uri: 'https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?page=',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };

    return new Promise((resolve, reject) => {

        getTotalNumber()
            .then((totalNumber) => {
                let result = {list: []};

                for (var index = 0; index < totalNumber / 20; index++) {
                    var requestOptions = paginationRequestOptions;
                    requestOptions["uri"] = requestOptions["uri"] + index
                    request(requestOptions, function (error, response, html) {
                        if (error) {
                            // throw error;
                            reject(error);
                        }
                        // console.log(html);
                        console.log('success');

                        // load website

                        const $ = cheerio.load(html);
                        $('.productList__item').each(function (index, elem) {
                            //console.log($(this).text());
                            brand = $(this).children('div').children('a').children('span.productList__itemManufacturer').text();
                            name = $(this).children('div').children('a').children('span.productList__itemTitle').text();
                            //console.log(name);
                            price = $(this).children('div').children('a').children('div').children('div').children('em').text().replace(/\s/g, '');
                            const productionInfo = {list: []};
                            productionInfo.name = brand + " " + name;
                            productionInfo.price = price;
                            result.list.push(productionInfo);

                            // console.log(brand);
                            // console.log(name);
                            // console.log(price);
                        });
                    })
                }
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

const parse = () => {
    console.log('brackParser');

    return new Promise((resolve, reject) => {
        //let results = {list: []};
        getList()
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            })
        /*
        getTotalNumber()
            .then((totalNumber) => {
                console.log(totalNumber);

                for (var i = 0; i < totalNumber / 20; i++) {
                    getList((i+1), results.list)
                        .then(result => results.push(result))
                        .catch((error) => {
                            reject(error);
                        })
                }
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
            */
    })
}

module.exports.parse = parse;



