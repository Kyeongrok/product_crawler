const fs = require('fs');

const data = fs.readFileSync('../test_data/2017-09-04.txt');
const string = data.toString();
console.log(string);

const writeFile = (text, targetFileName)=>{
  fs.writeFile(targetFileName, text, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

}

const getStringFromFile = (fileName) => {
  return 'string';
}

module.exports.getStringFromFile = getStringFromFile;