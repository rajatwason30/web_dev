const fs = require("fs");
const cheerio = require("cheerio");


let htmlKaData = fs.readFileSync("./index.html");
// htmlKaData => html treat to

let ch = cheerio.load(htmlKaData);

// console.log(ch);

let pTags = ch("p"); // returns an object(s) containing info about the selected tag(s)
//console.log(pTags); 

// as to access content of the object we use .text() function of cheerio
console.log(ch(pTags['0']).text()); 
console.log(ch(pTags['1']).text());


// as to get info


//<p class="main">I am a p tag in body !!!</p> => object form








// html me se => selector ke base => element get