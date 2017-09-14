const brackParser = require('../parser/brackParse');

brackParser.parse()
    .then(text => console.log(text))
    .catch((error) => {
        console.log(error);
    });
