const brackParser = require('../parser/brackParse');

brackParser.parse()
    .then(text => {
        console.log(text.length);
        console.log(text)
    })
    .catch((error) => {
        console.log(error);
    });
