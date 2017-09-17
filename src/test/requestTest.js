let Crawler = require('crawler');

let c = new Crawler({
  maxConnections : 10,
  // This will be called for each crawled page
  callback : function (error, res, done) {
    if(error){
      console.log(error);
    }else{
      let $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      console.log($('title').text());
    }
    done();
  }
});

// Queue URLs with custom callbacks & parameters
c.queue([{
  uri: 'http://www.google.com/',
  jQuery: false,

  // The global callback won't be called
  callback: function (error, res, done) {
    if(error){
      console.log(error);
    }else{
      console.log('Grabbed', res.body.length, 'bytes');
    }
    done();
  }
}]);