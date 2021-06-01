const request = require("request");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",cb);

function cb(error, response, data){
    parseData(data);
}

function parseData(data){
    let ch=cheerio.load(data);
    let allResult=ch('a[data-hover="View All Results"]');
    let allResultLink=allResult['0']['attribs']['href'];
    //allResultLink=ch(allResult['0']).attr("href");  this will be same as above line.
    allResultLink="https://www.espncricinfo.com"+allResultLink;
    getAllMatches(allResultLink);
}