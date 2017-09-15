const request = require('request');
const cheerio = require('cheerio');

const getTotalNumber = () => {
    console.log('getTotalNumber');
    const baseRequestOptions = {
        method: 'GET',
        uri: 'http://www.melectronics.ch/c/de/TV_%26_Audio/Fernseher/',
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
            $('.total').first().each(function (index, elem) {
                var totalNumber = Number($(this).text())
                // console.log(totalNumber);
                resolve(totalNumber)
            })
        });
    });
}

const subParse = (index) => {
    const requestOptions = {
        method: 'GET',
        uri: 'http://www.melectronics.ch/c/de/TV_%26_Audio/Fernseher/?fromIndex=',
        headers: {'User-Agent': 'Mozilla/5.0'},
    };
    requestOptions["uri"] += index;
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
            $('.right-area').each(function (index, elem) {
                // TODO: 공백처리
                name = $(this).children('div').children('h3.productname').text();

                const productionInfo = {list: []};
                if (name) {
                    //console.log(name);
                    productionInfo.name = name;
                    price = $(this).children('div').children('span').children('span');

                    if (price.children('span').text()) {
                        old = price.children('span.value').text()
                        productionInfo.appendix = old  // 기본값
                        current = price.text().split('Vorher')[0]
                        productionInfo.price= current // 세일가
                    } else {
                        current = price.text()
                        productionInfo.price = current // 기본가
                    }
                }
                result.push(productionInfo);
            })
            //console.log(result);
            resolve(result);
            //console.log("request end")
        });
    });
}

/*
setTimeout(function () {
    //console.log(_total_item);

    for (var i = 0; i < _total_item / 15; i++) {
        parser(i * 15);
        //console.log(i*15);
    }
}, 10000);
*/

const parse = () => {
    console.log('melectronicsParser');

    return new Promise((resolve, reject) => {
        getTotalNumber()
            .then((totalNumber) => {
                console.log(totalNumber);

                const max = (totalNumber / 15) + 1;
                promises = [];
                for (var i = 0; i < max; i++) {
                    promises.push(subParse(i * 15));
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