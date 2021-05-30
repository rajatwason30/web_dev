const fs= require("fs");

function getTeamFolder(teamName)
{
    let path="./IPL/"+teamName;
    if(!fs.existsSync(path))
        fs.mkdirSync(path);
    return path;
}
function getPlayerFolder(teamFolder,name)
{
    let batsmanPath = `${teamFolder}/${name}.json`;
    let batsmanFile = [];
    if(!fs.existsSync(batsmanPath))
    {
        let stringifiedData = JSON.stringify(batsmanFile); // [object] => [ {}]
        fs.writeFileSync(batsmanPath , stringifiedData);
    }
    return batsmanPath;
}
function writeData(teamName,name,runs,balls,fours,sixes,strikeRate){
    let teamFolder=getTeamFolder(teamName);
    let batsmanPath=getPlayerFolder(teamFolder,name);
    let stringifiedData = fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}

module.exports=writeData;