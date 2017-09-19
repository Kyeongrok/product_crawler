const melectronicsParser = require('../../parser/melectronicsParser');

melectronicsParser.parse()
    .then(text => console.log(text))
    .catch((error) => {
        console.log(error);
    });
