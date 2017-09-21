const microspotParser = require('../../parser/microspotParser');

microspotParser.parse()
    .then(text => {
        console.log(text);
    })
    .catch((error) => {
        console.log(error);
    });
