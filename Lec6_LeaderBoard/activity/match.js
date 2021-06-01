const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let leaderBoard=[];
let count=0;
function matchData(link){
    console.log("Sending!");
    count++;            //imp as to print after all async functions are processed
    request(link,cb);
}

function cb(error,response,data){
    console.log("Received!");
    parseData(data);
    count--;
    if(count==0)
        console.table(leaderBoard);
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
        for(let j=0;j<allTrs.length-1;j+=2)
        {
            //j+=2 bcoz every alternative tr is empty
            let batsman=ch(allTrs[j]).find("td");
            let name=ch(batsman['0']).text().trim();
            let runs=ch(batsman['2']).text().trim();
            let balls=ch(batsman['3']).text();
            let fours=ch(batsman['5']).text().trim();
            let sixes=ch(batsman['6']).text().trim();
            let strikeRate=ch(batsman['7']).text().trim();
            //console.log(teamName,name,runs,balls,fours,sixes,strikeRate);
            //processLeaderBoardFile(teamName,name,runs,balls,fours,sixes); // creates a .json file
            processLeaderBoard(teamName,name,runs,balls,fours,sixes); //pushes obj into local leaderBoard
        }
    }   
}
function processLeaderBoard(teamName,name,runs,balls,fours,sixes)
{
    let found=false;
    let i=0;
    for(;i<leaderBoard.length;i++)
    {
        if(leaderBoard[i]['Name']==name && leaderBoard[i]['Team Name']==teamName)
        {
            found=true;
            break;
        }
    }
    if(!found){
        let playerInfo={
            "Team Name": teamName,
            "Name": name,
            "Runs": Number(runs),
            "Balls": Number(balls),
            "Fours": Number(fours),
            "Sixes": Number(sixes)
        };
        leaderBoard.push(playerInfo);
    }
    else{
        leaderBoard[i]['Runs']+= Number(runs);
        leaderBoard[i]['Balls']+= Number(balls);
        leaderBoard[i]['Fours']+= Number(fours);
        leaderBoard[i]['Sixes']+= Number(sixes);
    }
}
function processLeaderBoardFile(teamName,name,runs,balls,fours,sixes)
{
    let path="./leaderBoard.json";
    let stringifiedData=fs.readFileSync(path);
    let leaderBoardArr=JSON.parse(stringifiedData);
    let found=false;
    let i=0;
    for(;i<leaderBoardArr.length;i++)
    {
        if(leaderBoardArr[i]['Name']==name && leaderBoardArr[i]['Team Name']==teamName)
        {
            found=true;
            break;
        }
    }
    if(!found){
        let playerInfo={
            "Team Name": teamName,
            "Name": name,
            "Runs": Number(runs),
            "Balls": Number(balls),
            "Fours": Number(fours),
            "Sixes": Number(sixes)
        };
        leaderBoardArr.push(playerInfo);
    }
    else{
        leaderBoardArr[i]['Runs']= parseFloat(leaderBoardArr[i]['Runs'])+parseFloat(runs);
        leaderBoardArr[i]['Balls']= parseFloat(leaderBoardArr[i]['Balls'])+parseFloat(balls);
        leaderBoardArr[i]['Fours']= parseFloat(leaderBoardArr[i]['Fours'])+parseFloat(fours);
        leaderBoardArr[i]['Sixes']= parseFloat(leaderBoardArr[i]['Sixes'])+parseFloat(sixes);
    }
    stringifiedData=JSON.stringify(leaderBoardArr);
    fs.writeFileSync(path , stringifiedData);
}
module.exports=matchData;