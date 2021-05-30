const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeData = require("./createFiles");

function matchData(link){
    request(link,cb);
}

function cb(error,response,data){
    parseData(data);
}

function parseData(data){
    let ch=cheerio.load(data);
    let innings=ch('div[class="Collapsible"]');
    // fs.writeFileSync("./scoreCard.html",collapsible+"");
    for(let i=0;i<innings.length;i++)
    {
        let teams=ch(innings[i]).find(".Collapsible h5");
        let teamName=ch(teams['0']).text().split("INNINGS")[0].trim();
        let battingTable=ch(innings[i]).find(".table.batsman");
        let allTrs=ch(battingTable).find("tbody tr");
        for(let j=0;j<allTrs.length;j+=2)
        {
            //j+=2 bcoz every alternative tr is empty
            let batsman=ch(allTrs[j]).find("td");
            let name=ch(batsman['0']).text().trim();
            let runs=ch(batsman['2']).text().trim();
            let balls=ch(batsman['3']).text().trim();
            let fours=ch(batsman['4']).text().trim();
            let sixes=ch(batsman['5']).text().trim();
            let strikeRate=ch(batsman['6']).text().trim();
            writeData(teamName,name,runs,balls,fours,sixes,strikeRate);
        }
    }   
}
module.exports=matchData;