const request = require('request');
const cheerio = require('cheerio');

const getTotalNumber = () => {
    const baseRequestOptions = {
        method: 'GET',
        uri: 'https://www.microspot.ch/de/fernseher-audio/fernseher-heimkino/fernseher--C111000/',
        headers: {
        },
    };

    console.log('request:', 'getTotalNumber');

    return new Promise((resolve, reject) => {
      request(baseRequestOptions, (error, response, html) => {
        if (error) reject(error);
        //console.log(html);
        console.log('success');

        // load website
        let $ = null;
        try {
            $ = cheerio.load(html);
        } catch (e) {
            console.log(e)
        }

        // find total number of item
        $('._1oIOyw').each(function () {
          //console.log($(this).text());

          const totalNumber = Number($(this).text().split('von')[1].replace(/\s/g, ''));

            //console.log(totalNumber);
            resolve(totalNumber)
        });
      });
      console.log("finish");

    });


}

const subParse = (index) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://www.microspot.ch/de/fernseher-audio/fernseher-heimkino/fernseher--C111000/?=',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        },
    };
    requestOptions['uri'] += index
    console.log(requestOptions.uri);

    console.log('subParse request to microspot');
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

            const result = [];
            $('._2vPjEq').each(function () {
            //console.log($(this).text());
            const name = $(this).children('div').children('h3').text();
            const price = $(this).children('div').children('div').children('span').text().replace(/\s/g, '').replace(/'/g, '');
            const productInfo = {};
            if (price) {
            //console.log(price);
            productInfo.name = name;
            productInfo.price = price.replace(/[^0-9]/g,'');
            productInfo.currency = '';
            productInfo.appendix = '';
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
    console.log('microspotParser');
    return new Promise((resolve, reject) => {
        getTotalNumber()
            .then((totalNumber) => {
                console.log(totalNumber);
                const max = (totalNumber / 24) + 1;
                console.log(max);
                const promises = [];
                for (let i = 1; i < max; i++) {
                    console.log('subParse:', i)
                    promises.push(subParse(i));
                }
                const result = {status: 'ok', list: []};
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
