const brackParser = require('../parser/brackParser');

brackParser.parse()
    .then(text => {
        console.log(text.list.length);
        console.log(text)
    })
    .catch((error) => {
        console.log(error);
    });
