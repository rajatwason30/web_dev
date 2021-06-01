const cheerio=require("cheerio");
const request=require("request");
const getTopic = require("./topic");

let link="https://github.com/topics";
request(link,cb);
function cb(error, response, data){
    parseFile(data);
}

function parseFile(data){
    let ch=cheerio.load(data+"");
    let allTopics=ch(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<allTopics.length;i++){
        let topicName=ch(allTopics[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1").text().trim();
        let topicLink="https://github.com"+ch(allTopics[i]).attr("href");
        // console.log(topicName+"  ",topicLink);
        getTopic(topicName,topicLink);
    }
}
