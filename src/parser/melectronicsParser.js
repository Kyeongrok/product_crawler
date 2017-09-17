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
            $('.total').first().each(function () {
                const totalNumber = Number($(this).text())
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
            $('.right-area').each(function () {
                const name = $(this).children('div').children('h3.productname').text();
                if (name) {
                    const productionInfo = {};
                    //console.log(name);
                    productionInfo.name = name.replace(/\n\s*\t/, '').replace(/\n\n\s+/, '');

                    const price = $(this).children('div').children('span').children('span');

                    if (price.children('span').text()) {
                        const old = price.children('span.value').text()
                        productionInfo.appendix = old;  // 기본값
                        const current = price.text().split('Vorher')[0]
                        productionInfo.price= current.replace(/[^0-9]/g,'') // 세일가
                    } else {
                        const current = price.text()
                        productionInfo.price = current.replace(/[^0-9]/g,''); // 기본가
                    }

                    result.push(productionInfo);
                }
            })
            //console.log(result);
            resolve(result);
            //console.log("request end")
        });
    });
}

const parse = () => {
    console.log('melectronicsParser');

    return new Promise((resolve, reject) => {
        getTotalNumber()
            .then(totalNumber => {
                console.log(totalNumber);

                const max = (totalNumber / 15) + 1;
                const promises = [];
                for (let i = 0; i < max; i++) {
                  console.log('subPars:', i);
                    promises.push(subParse(i * 15));
                }
                const result = { status: 'ok', list: [] };
                Promise.all(promises)
                    .then((data) => {
                        //console.log(data);
                        //result.concat(data);
                        for (let i = 0; i < max - 1; i++) {
                            //console.log(data[i]);
                            result.list = result.list.concat(data[i]);
                        }
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    })

            })
            .catch((error) => {
                reject(error);
            })

    });
}

module.exports.parse = parse;