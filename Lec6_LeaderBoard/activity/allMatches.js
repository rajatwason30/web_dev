const request = require("request");
const cheerio = require("cheerio");
const matchData = require("./match");

function getAllMatches(link){
    request(link,cb);
}
function cb(error, response, data){
    parseData(data);
}
function parseData(html){
    let ch=cheerio.load(html);
    let allScoreCards=ch('a[data-hover="Scorecard"]');   
    for(let i=0;i<allScoreCards.length;i++)
    {
        let linkToScoreCard="https://www.espncricinfo.com"+ch(allScoreCards[i]).attr("href");
        matchData(linkToScoreCard); 
    }
    console.log("I ran after for loop!");
}
module.exports=getAllMatches;