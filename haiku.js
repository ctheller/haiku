var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

function createHaiku(structure){
    var formattedDict = formatData(cmudictFile),
        output = "Haiku:",
        randomWord;
    structure.forEach(function(lineStruct){
      output += "\n";
      lineStruct.forEach(function(num){
        randomWord = chooseRandomWord(formattedDict,(num-1));
        if (randomWord.match(/\(\d\)/)){
          randomWord = randomWord.replace(/\(\d\)/,"");
        }
        output += randomWord+" ";
      });
  })
  return output;
}

function chooseRandomWord(syllablesArrDict, num){
  var randomWord = syllablesArrDict[num][Math.floor(Math.random()*syllablesArrDict[num].length)];
  return randomWord;
}

module.exports = {
  createHaiku: createHaiku,
};

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
  var lines = data.toString().split("\n"),
      syllablesArrDict = [[],[],[],[],[],[],[]],
      lineSplit,
      word,
      phoneme,
      syllableCount;
  lines.forEach(function(line){    
    lineSplit = line.split("  "); 
    if (!lineSplit[1]){ 
      return;} 
    word = lineSplit[0];
    phoneme = lineSplit[1];
    var syllableArr = phoneme.match(/\d/g);
    if (!syllableArr){
      syllableCount = 1;
    }
    else {
      syllableCount = syllableArr.length;
    }
    if (syllableCount<8){
      syllablesArrDict[syllableCount-1].push(word);
    }
  });
  return syllablesArrDict;   
}
