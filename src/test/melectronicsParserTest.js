const melectronicsParser = require('../parser/melectronicsParse');

melectronicsParser.parse()
    .then(text => console.log(text))
    .catch((error) => {
        console.log(error);
    });
