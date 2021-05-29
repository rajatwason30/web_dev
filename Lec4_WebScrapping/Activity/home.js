// Tools learnt
// basic html
// selectors in html
// cheerio module
// request module to get html file
// async functions working
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

//activity 1: get view all result on given link
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url, cb); //gets html file of above link and calls cb once done

function cb(error, response, body) {
  parseBody(body);
}

function parseBody(html) {
  // i will get html here of cricinfo ipl home page !!
  let ch = cheerio.load(html);
  //wrapping of object in cheerio
  let aTagKaData = ch('a[data-hover="View All Results"]').text();
  console.log("\nActivity 1");
  console.log(aTagKaData);
}

//activity 2; to get last ball comentary from given link
let lastBallCommentary = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
request(lastBallCommentary,function(err, resp, html){
    let ch = cheerio.load(html);
    let tag = ch('div[itemprop="articleBody"]');
    console.log("\nActivity 2");
    console.log(ch(tag['0']).text()); // i need only 1st tag(0th index) with itemprop="aticlrBody"
});

//activity 3: to get max wicket taker from given link from both the tables
let highestWicketTaker = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"
request(highestWicketTaker,function(err,response, html){
  getMaxWicketTaker(html);
  printTables(html);
});

function getMaxWicketTaker(html)
{
    let ch=cheerio.load(html);
    let tables=ch(".table.bowler tbody"); // apply selector. return obj of two tables of Dc and MI
    //console.log(tables.text());
    fs.writeFileSync("./bowlertTable.html",tables+"");
    // see bowlerTable.htlm file to see the two tables in html format
    let ans={
      "name":"",
      "wkts":0,
      "econ":0
    };
    for(let i=0;i<tables.length;i++)
    {
      let allRows=ch(tables[i]).find("tr"); //return object of obj of all rows in table[i] contining rows of it
      for(let j=0;j<allRows.length;j++)
      {
        let allCol=ch(allRows[j]).find("td"); //return obj of obj of cols of jth row in ith table
        if(ch(allCol['4']).text() > ans['wkts'])
        {
          ans['name']=ch(allCol['0']).text();
          ans['wkts']=ch(allCol['4']).text();
          ans['econ']=ch(allCol['5']).text();
        }
      }
    }
    console.log("\nActivity 3");
    console.log(ans);
}
// Activity 4: to print tables
function printTables(html)
{
  console.log("\nActivity 4");
  let ch=cheerio.load(html);
  let tables=ch(".table.bowler tbody"); // apply selector. return obj of two tables of Dc and MI  
  for(let i=0;i<tables.length;i++)
  {
    console.log("Table: ",i)
    let allRows=ch(tables[i]).find("tr"); //return object of obj of all rows in table[i] contining rows of it
    for(let j=0;j<allRows.length;j++)
    {
      let allCol=ch(allRows[j]).find("td"); //return obj of obj of cols of jth row in ith table
      for(let k=0;k<allCol.length;k++)
        console.log(ch(allCol[k]).text());
    }
  }
}