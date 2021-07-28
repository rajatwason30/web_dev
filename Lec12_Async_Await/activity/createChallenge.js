const puppeteer=require("puppeteer");
const challenges=require("./challenges");
let tab;
let id="cosej63635@beydent.com";
let pw="123456789"; 
(async function(){
    let browser = await puppeteer.launch({
        headless:false, 
        defaultViewport:null, 
        args:["--start-maximized"]
    });
    let pages = await browser.pages();
    tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    console.log("Tab oppened!")
    await tab.type("#input-1", id); // keyboard keys emulates
    await tab.type("#input-2", pw);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"); //navigation => page change
    console.log("Succesfully logeed in!")
    await tab.waitForTimeout(5000);
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]', {visible:true});
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    console.log("Clicked on dropdown!")
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]',{visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForTimeout(2500);
    await tab.waitForSelector("#content > div > div > div > section > header > ul > li:nth-child(2) > a");
    await tab.click("#content > div > div > div > section > header > ul > li:nth-child(2) > a");
    console.log("On manage challenges page");
    await tab.waitForSelector("#content > div > div > div > section > div:nth-child(2) > button");
    let createChallengeElem = await tab.$("#content > div > div > div > section > div:nth-child(2) > button");
    let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href");} , createChallengeElem);
    createChallengeLink = "https://www.hackerrank.com" + createChallengeLink;
    
    // for 1 challenge
    // await addChallenge(challenges[0],browser,createChallengeLink);
    // simultaenously open tabs for all the challenges
    // for(let i=0 ; i<challenges.length ; i++){
    //     addChallenge(challenges[i] , browser , createChallengeLink );
    //     await tab.waitForTimeout(3000);
    // }
    
    // OR

    // add challenges one by one
    for(let i=0 ; i<challenges.length ; i++){
        // add a single challenge
        await addChallenge(challenges[i] , browser , createChallengeLink );
    }
})();


async function addChallenge(challenge, browser, link){
    let newTab = await browser.newPage();
    await newTab.goto(link);
    await newTab.waitForSelector("#name");
    await newTab.type("#name",challenge["Challenge Name"]);
    await newTab.type("#preview",challenge["Description"]);
    await newTab.waitForTimeout(1000);
    await newTab.type("#problem_statement-container > div > div > div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea",challenge["Problem Statement"]);
    await newTab.type("#input_format-container .CodeMirror textarea",challenge["Input Format"]);
    await newTab.type("#constraints-container > div > div > div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea",challenge["Constraints"]);
    await newTab.type("#output_format-container .CodeMirror textarea",challenge["Output Format"]);
    await newTab.type("#tags_tag",challenge["Tags"]);
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    newTab.close();
}
