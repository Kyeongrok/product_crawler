const conformaParser = require('../../parser/conforamaParser');

conformaParser.parse()
  .then(result => console.log(result))
  .catch((error) => {
    console.log(error);
  });
