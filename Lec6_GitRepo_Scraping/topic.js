const cheerio=require("cheerio");
const request=require("request");
const getRepo = require("./repo");

// let topicName="";
// getTopic("JS","https://github.com/topics/clojure");

function getTopic(topicName,link){
    // topicName=topName;
    request(link, function(error, response, data){
        parseFile(data,topicName);
    })
}

function parseFile(data,topicName){
    let ch=cheerio.load(data+"");
    let allRepos=ch(".f3.color-text-secondary.text-normal.lh-condensed");
    let numberOfRepos=5;
    for(let i=0;i<numberOfRepos;i++){
        let repo=ch(allRepos[i]).find(".text-bold");
        let repoName=ch(repo).text().trim();
        let repoLink="https://github.com"+ch(repo).attr("href")+"/issues";
        // console.log(topicName+"  ",repoName+"  ",repoLink);
        getRepo(topicName,repoName,repoLink);
    }
}

module.exports=getTopic;