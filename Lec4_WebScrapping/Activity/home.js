// Tools learnt
// basic html
// selectors in html
// cheerio module
// request module to get html file
// async functions working
const request = require("request");
const cheerio = require("cheerio");


//activity 1
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url, cb); //gets html file of above link and calls cb once done

function cb(error, response, body) {
  parseBody(body);
}

function parseBody(html) {
  // i will get html here of cricinfo ipl home page !!
  let ch = cheerio.load(html);
  let aTagKaData = ch('a[data-hover="View All Results"]').text();
  console.log(aTagKaData);
}

//activity 2; to get last ball comentary from given link
let lastBallCommentary = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
request(lastBallCommentary,function(err, resp, html){
    let ch = cheerio.load(html);
    let tag = ch('div[itemprop="articleBody"]');
    console.log(ch(tag['0']).text()); // i need only 1st tag(0th index) with itemprop="aticlrBody"
});

//activity 3: to get max wicket taker from given link
// let highestWicketTaker = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"
// request(highestWicketTaker,cbb);

// cbb(err, response, html)
// {
//     let ch=cheerio.load(html);
//     let tag=ch(); // apply selector
// }
