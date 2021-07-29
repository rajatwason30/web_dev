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
    addModerators(browser,tab);
})();

async function addModerators(browser , tab){
     
    //1. get all links of all the questions
    await tab.waitForSelector('.backbone.block-center' , {visible:true});
    let listOfElems=await tab.$$(".backbone.block-center");
    let listOfLinks=[];
    for(let i=0;i<listOfElems.length;i++){
        listOfLinks.push("https://www.hackerrank.com" + await tab.evaluate( function(elem){ return elem.getAttribute("href");}, listOfElems[i]));
    }
    // console.log(listOfLinks);

    // loop on allLinks and call addModeratorToAQuestion for every quesLink
    //2. addModeratorsToAQuestion(quesLink , browser ); // it will add moderator to a single question
    
    // await addModeratorsToAQuestion(listOfLinks[0],browser);
    for(let i=0;i<listOfLinks.length;i++){
        await addModeratorsToAQuestion(listOfLinks[i],browser);
    }

    // 3. if next button is not disabled then click on it
    let allLis = await tab.$$('.pagination li');
    let nextBtnLi = allLis[allLis.length-2];
    let isDisabled = await tab.evaluate( function(elem){ return elem.classList.contains("disabled"); } , nextBtnLi );
    if(isDisabled){
        return;
    }
    else{
        await nextBtnLi.click();
        await addModerators(browser , tab);
    }
    // 4. call addModerators(browser , tab);
}

async function addModeratorsToAQuestion(link,browser){
    let newTab = await browser.newPage();
    await newTab.goto(link);
    await newTab.waitForTimeout(2000);
    await newTab.waitForSelector("#content > div > section > header > div > div.tabs-cta-wrapper > ul > li:nth-child(2) > a");
    await newTab.click("#content > div > section > header > div > div.tabs-cta-wrapper > ul > li:nth-child(2) > a");
    await newTab.waitForSelector("#moderator");
    await newTab.type("#moderator","cosen");
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.waitForTimeout(4000);
    await newTab.close();
}