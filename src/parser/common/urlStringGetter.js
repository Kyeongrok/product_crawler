const request = require('request');

const getStringFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: "GET",
      headers: [
        {name: 'content-type',value: 'application/x-www-form-urlencoded'},
      ],
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
    },(error, response, body)=>{
      if(!error && response.statusCode == 200){
        resolve(body);
      }else{
        console.log('error' + response.statusCode);
      }
    });
  });
}

module.exports.getStringFromUrl = getStringFromUrl;
