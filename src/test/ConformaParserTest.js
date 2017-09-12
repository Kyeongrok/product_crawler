const conformaParser = require('../parser/conforamaParse');

conformaParser.parse()
  .then(text => console.log(text))
  .catch((error) => {
    console.log(error);
  });
