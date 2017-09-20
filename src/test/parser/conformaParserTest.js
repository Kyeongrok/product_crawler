const conformaParser = require('../../parser/conforamaParser');

conformaParser.parse()
  .then(text => console.log(text))
  .catch((error) => {
    console.log(error);
  });
