var page = require('webpage').create(),
  system = require('system'),
  t, address;

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

t = Date.now();
address = "https://www.interdiscount.ch/idshop/de/eneCategory/led-lcd-tv/detail.jsf?N=3913&Ns=rating%7C1";
page.open(address, function(status) {
  var title = page.evaluate(function() {
    console.log(document);
    return document.title;
  });
  console.log('Page title is ' + title);
  if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    page.render('example.png');
    t = Date.now() - t;
    console.log('Loading ' + system.args[1]);
    console.log('Loading time ' + t + ' msec');
  }
  phantom.exit();
});