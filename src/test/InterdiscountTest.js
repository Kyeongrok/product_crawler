const interdiscountUrl = 'https://www.interdiscount.ch/idshop/de/eneCategory/led-lcd-tv/detail.jsf?N=3913&Ns=rating%7C1';

const request = require('request');
const cheerio = require('cheerio');

const requestOptions = {
  method: 'GET',
  uri: interdiscountUrl,
  headers: { 'User-Agent': 'Mozilla/5.0' },
};

request(requestOptions, (error, response, html) => {
  if (error) { throw error; }
  console.log(html);
});
