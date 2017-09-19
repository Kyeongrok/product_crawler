const urlStringGetter = require('../../../parser/common/urlStringGetter');

urlStringGetter.getStringFromUrl('http://www.google.com/')
  .then(string => console.log(string));
