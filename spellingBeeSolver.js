//..............Include Express..................................//
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

//..............Create an Express server object..................//
const app = express();

//..............Apply Express middleware to the server object....//
app.use(express.json()); //Used to parse JSON bodies (needed for POST requests)
app.use(express.urlencoded());
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library


function spell(lettersArray){
let lower = []
for(let i of lettersArray){
    lower.push(i.toLowerCase())
}
let textFile = fs.readFileSync('data/words.txt').toString('utf-8')
let textSplit = textFile.split('\r\n')
console.log(textSplit.length)
let fourLetters = textSplit.filter(function(word){
    return(word.length>3);
})
console.log(fourLetters.length)
let onlyContainsGiven = fourLetters.filter(function(word){
    let lowerWord = word.toLowerCase()
    for(let i of lowerWord){
        if(lower.indexOf(i) == -1){
            return false
        }
    }
    return true;
})
console.log(onlyContainsGiven.length)

let requireCenterLetter = onlyContainsGiven.filter(function(word){
    return(word.indexOf(lower[0])>-1)
})

let noProperNouns = requireCenterLetter.filter(function(word){
    return(word[0] === word[0].toLowerCase())
})
console.log(noProperNouns)
console.log(noProperNouns.length)
let pangram = []
for(let i of noProperNouns){
    if(i.indexOf(lower[0]) > -1 && i.indexOf(lower[1]) > -1 && i.indexOf(lower[2]) > -1 && i.indexOf(lower[3]) > -1 && i.indexOf(lower[4]) > -1 && i.indexOf(lower[5]) > -1 && i.indexOf(lower[6]) > -1){
        pangram.push(i)
    }
}
console.log(pangram)
}

let toTest = ["R","A","O","G","U","D","N"]
spell(toTest);

