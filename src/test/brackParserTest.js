const brackParser = require('../parser/brackParser');

brackParser.parse()
    .then(text => console.log(text))
    .catch((error) => {
        console.log(error);
    });
