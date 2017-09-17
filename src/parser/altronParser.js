const request = require('request');
const cheerio = require('cheerio');

const getTotalNumber = () => {
    const baseRequestOptions = {
        method: 'GET',
        uri: 'https://www.alltron.ch/ce/tv-home-cinema/tv/tv',
        headers: {
          // 'Host': 'www.alltron.ch',
          // 'Upgrade-Insecure-Requests':'1'
          // 'Accept':'text/html,application/xhtml+xml,application/xml;',
        },
    };

    console.log('request:','getTotalNumber');
    return new Promise((resolve, reject) => {
        request(baseRequestOptions, function (error, response, html) {
            if (error) reject(error);
            // console.log(html);:
            console.log('success');

            // load website
          let $ = null;
          try {
            $ = cheerio.load(html);
          } catch (e) {
            console.log(e)
          }

            // find total number of item
            $('.searchTitle').each(function () {
                const totalNumber = Number($(this).children('h2').children('span').text().split('Ergebnisse')[0].replace(/\s/g, ''));
                console.log(totalNumber);
                resolve(totalNumber)
            })
        });
    });
}

const subParse = (index) => {
  const requestOptions = {
      method: 'GET',
      uri: 'https://www.alltron.ch/ce/tv-home-cinema/tv/tv?page=',
      headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',

      },
  };
  requestOptions['uri'] += index
  console.log(requestOptions.uri);

  console.log('subParse request to altron');
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


      const result = { status: 'ok', list: [] };
      $('.box1.teaserSmallImageWide.productListResultItem').each(function () {
          //console.log($(this).text());
          const name = $(this).children('div').children('div').children('h3').children('a').text();
          const price = $(this).children('div').children('div').children('div').children('span.price').text().replace(/\s/g, '');
          const productInfo = {};
          if (price) {
              //console.log(price);
              productInfo.name = name;
              productInfo.price = price.replace(/[^0-9]/g,'');
              result.list.push(productInfo);
          }
      });
      //console.log(result);
      resolve(result);
      //console.log("request end")
    });
  });
}


const parse = () => {
    console.log('altronParser');
    return new Promise((resolve, reject) => {
        getTotalNumber()
            .then((totalNumber) => {
                console.log(totalNumber);
                const max = (totalNumber / 50) + 1;
                const promises = [];
                for (let i = 1; i < max; i++) {
                  console.log('subParse:', i)
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
