const altronParser = require('../parser/altronParser');

altronParser.parse()
    .then(text => console.log(text))
    .catch((error) => {
        console.log(error);
    });
