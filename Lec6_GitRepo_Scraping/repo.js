const cheerio=require("cheerio");
const request=require("request");
const fs= require("fs");

// getRepo("TNJS","metabase","https://github.com/metabase/metabase/issues");

function getRepo(topicName,repoName,repIssueLink){
    // topicName=topName;
    // repoName=repName;
    request(repIssueLink,function(error,response,data){
        parseData(data,topicName,repoName);
    })
}

function parseData(data,topicName,repoName){
    let ch=cheerio.load(data+"");
    let allIssues=ch(".d-block.d-md-none.position-absolute.top-0.bottom-0.left-0.right-0");
    let numberOfIsuues=6;
    for(let i=0;i<numberOfIsuues;i++){
        let issue=allIssues[i];
        let issueTitle=String(ch(issue).attr("aria-label")).split('. ')[1].trim();
        let issueLink="https://github.com"+ch(issue).attr("href");
        // console.log(issueTitle+" ",issueLink);
        processIssue(topicName,repoName,issueTitle,issueLink);
    }
}

function getFolderPath(topicName){
    let path="./GIT/"+topicName;
    if(!fs.existsSync(path))
        fs.mkdirSync(path);
    return path;
}

function getRepoPath(topicFolderPath,repoName){
    let path=topicFolderPath+"/"+repoName;
    let repoJsonPath = path+"/"+repoName+".json";
    if(!fs.existsSync(path))
    {
        fs.mkdirSync(path);
        let repoIssueFile = []; 
        let stringifiedData = JSON.stringify(repoIssueFile); // [object] => [ {}]
        fs.writeFileSync(repoJsonPath , stringifiedData);
    }
    return repoJsonPath;
}
function processIssue(topicName,repoName,issueTitle,issueLink){
    //GIT->Topics->Repos-> each repo has 1 .json file [{issueTopic:issueLink},{},{}]
    //check folder for topic
    let topicFolderPath=getFolderPath(topicName);
    let repoIssueJsonPath=getRepoPath(topicFolderPath,repoName);
    let stringifiedData=fs.readFileSync(repoIssueJsonPath);
    let repoIssueFile=JSON.parse(stringifiedData);
    let issueInfo={};
    issueInfo[issueTitle]=issueLink;
    repoIssueFile.push(issueInfo);
    fs.writeFileSync(repoIssueJsonPath,JSON.stringify(repoIssueFile));
}
module.exports=getRepo;