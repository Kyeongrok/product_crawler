const alltronParser = require('../parser/alltronParse');

alltronParser.parse()
    .then(text => console.log(text))
    .catch((error) => {
        console.log(error);
    });
