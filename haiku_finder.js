var fs = require('fs');
var cmudictFile = readTextFile('./cmudict.txt');
var book = readTextFile('./pride_and_prejudice.txt');

function readTextFile(file){
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

var wordSyllableCount = function(word){
  syllablesArrDict = formatData(cmudictFile);
  for (var i =0; i<syllablesArrDict.length;i++){
    if (syllablesArrDict[i].indexOf(word.toUpperCase())>(-1)){
      return i+1;
    }
  }
  return 0;
}

function formatBook(data){
  var formattedData = data.replace(/\W+/ig, " ");
  return formattedData.split(" ");
}

function haikuFinder(){
  var bookArray = formatBook(book),
      placeholder = 0,
      lineOne = [],
      lineTwo = [],
      lineThree = [],
      lineOneSyl = 0,
      lineTwoSyl = 0,
      lineThreeSyl = 0,
      randomStart = Math.floor(Math.random()*bookArray.length+1);
  for (var i = randomStart; i<bookArray.length; i++){
    if (lineOne === []){
      placeholder = i;
    }
    if (lineOneSyl<5){
      lineOne.push(bookArray[i]);
      lineOneSyl+=wordSyllableCount(bookArray[i]);
    }
    else if (lineOneSyl === 5){
      if (lineTwoSyl<7){
        lineTwo.push(bookArray[i]);
        lineTwoSyl+=wordSyllableCount(bookArray[i]);
      }
      else if (lineTwoSyl === 7){
        if (lineThreeSyl<5){
          lineThree.push(bookArray[i]);
          lineThreeSyl+=wordSyllableCount(bookArray[i]);
        }
        else if (lineThreeSyl === 5){
          return lineOne.join(" ")+"\n"+lineTwo.join(" ")+"\n"+lineThree.join(" ");
        }
        else {
          lineOne = [];
          lineTwo = [];
          lineThree = [];
          lineOneSyl = 0;
          lineTwoSyl = 0;
          lineThreeSyl = 0;
          i = placeholder; 
        }  
      }
      else {
        lineOne = [];
        lineTwo = [];
        lineOneSyl = 0;
        lineTwoSyl = 0; 
        i = placeholder; 
        }  
    }
    else {
      lineOne = [];
      lineOneSyl = 0;
      i = placeholder; 
    }
  }
}

console.log(haikuFinder());

