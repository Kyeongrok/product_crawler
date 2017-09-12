const digitecParse = require('../parser/digitecParse');

digitecParse.parse()
  .then(text => console.log(text))
  .catch((error) => {
    console.log(error);
  });

