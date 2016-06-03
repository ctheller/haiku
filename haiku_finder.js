var fs = require('fs');
var haiku = require('./haiku');

var cmudictFile = readTextFile('./cmudict.txt');
var syllablesArrDict = haiku.formatData(cmudictFile);

function readTextFile(file){
  return fs.readFileSync(file).toString();
}


var wordSyllableCount = function(word){
  //deal with 's (remove for the word match since it doesn't affect num of syllables)
  if (/\'s$/.test(word)){
    word = word.slice(0,-2);
  }
  for (var i =0; i<syllablesArrDict.length;i++){
    if (syllablesArrDict[i].indexOf(word.toUpperCase())>(-1)){
      return i+1;
    }
  }
  return 8; //hard-coded. Returns a number that is outside of the haiku's params (must be 7 syllables or less).
}

function formatBook(book){
  //leaves in apostrophe's and hyphens
  var formattedBook = book.replace(/[^(\')|\w|-]/g, " ");
  return formattedBook.split(" ");
}

function haikuFinder(book){
  var bookArray = formatBook(readTextFile(book));
  var placeholder,
      lineOne=[],
      lineTwo=[],
      lineThree=[], 
      lineOneSyl=0, 
      lineTwoSyl=0, 
      lineThreeSyl=0;

  var randomStart = Math.floor(Math.random()*bookArray.length+1);

  for (var i = randomStart; i<bookArray.length; i++){
    if (lineOne.length === 0){
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
          return "Haiku From Selected Book:\n"+lineOne.join(" ")+"\n"+lineTwo.join(" ")+"\n"+lineThree.join(" ");
        }
        else {
          lineOne=[];
          lineTwo=[];
          lineThree=[]; 
          lineOneSyl=0; 
          lineTwoSyl=0; 
          lineThreeSyl=0;
          i = placeholder; 
        }  
      }
      else {
        lineOne=[];
        lineTwo=[];
        lineOneSyl=0; 
        lineTwoSyl=0;
        i = placeholder; 
        }  
    }
    else {
      lineOne=[];
      lineOneSyl=0;        
      i = placeholder; 
    }
  }
}

module.exports = {
  haikuFinder: haikuFinder,
};

