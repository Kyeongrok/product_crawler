const digitecParser = require('../../parser/digitecParser');

digitecParser.parse()
  .then(result => console.log(result))
  .catch((error) => {
    console.log(error);
  });