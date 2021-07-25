const puppeteer=require("puppeteer");

let tab;
let id="cosej63635@beydent.com";
let pw="123456789"; 
let idx, gCode;
let browserOpenPromise=puppeteer.launch({
    headless:false, 
    defaultViewport:null, 
    args:["--start-maximized"]
});

browserOpenPromise
.then(function(browser){
    console.log("Browser opened !!!");
    let allPagesPromise = browser.pages();
    return allPagesPromise;
})
.then(function(pages){
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    console.log("Tab oppened!")
    return pageOpenPromise;
  })
  .then(function () {
    let idTypePromise = tab.type("#input-1", id); // keyboard keys emulates
    return idTypePromise;
  })
  .then(function () {
    let pwTypePromise = tab.type("#input-2", pw);
    return pwTypePromise;
  })
  .then(function () {
    let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"); //navigation => page change
    console.log("Succesfully logeed in!")
    return loginPromise;
  })
  .then(function(){
    console.log("Clicked on interview tab");
    let waitAndClickPromise=waitAndClick("#base-card-1-link");
    return waitAndClickPromise;
  })
  .then(function(){
    console.log("Clicked on a specific topic")
    let waitAndClickPromise=waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
  })
  .then(function(){
    console.log("Waiting for list of question page");
    let waitKaPromise = tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});
    return waitKaPromise;
  })
  .then(function(){
    // write some code using puppeteer such that it runs a code equivalent 
    // to tab.someFun() == document.querySelectorAll() -> returns a list of all which satisfy the selector
    console.log("Getting list of questions")
    let tabPromise = tab.$$(".js-track-click.challenge-list-item"); // [{},{}.{},{}]
    return tabPromise;
  })
  .then(function(allQuesTags){
    // [{<a "href"="njdj"/>}, {<a "href"="njdj"/>},{<a "href"="njdj"/>},{<a "href"="njdj"/>}]
    console.log("Received all objects for given selector. Finding href from these objs");

    let allLinksPromise=[];
    for(let i=0;i<allQuesTags.length;i++){
      let aTag=allQuesTags[i];
      let aTagPromise= tab.evaluate(function(elem){
        return elem.getAttribute("href");
      }, aTag);
      allLinksPromise.push(aTagPromise);
    }
    // allLinskPromise => [Promise<pending>,Promise<pending>,Promise<pending>,Promise<pending>]
    //pending promises have been pushed to array. But we have to return only 1 pending promise to next then()
    let sabkaPromise=Promise.all(allLinksPromise);
    // allLinskPromise => [Promise<link>,Promise<link>,Promise<link>,Promise<link>]
    return sabkaPromise; // return [link, link, link, link]
  })
  .then(function(listOfLinks){
    console.log("Received list of links");
    let completeLinks = listOfLinks.map(link=>{return "https://www.hackerrank.com" + link;});
    console.log(completeLinks);
    let oneQuesSolvePromise= solveQuestion(completeLinks[0]);
    return oneQuesSolvePromise;
  })
  .catch(function(error){
      console.log(error);
  })

  function waitAndClick(selector){
    return new Promise(function(resolve, reject){
      let ipWaitPromise=tab.waitForSelector(selector);
      ipWaitPromise.then(function(){
        let ipClickPromise=tab.click(selector);
        return ipClickPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    })
  }

  function getCode(){
    return new Promise(function(resolve, reject){
      let waitPromise = tab.waitForSelector(".hackdown-content h3");
      waitPromise.then(function(){
        let allCodeNamesElementsPromise = tab.$$(".hackdown-content h3");
        return allCodeNamesElementsPromise;
      })
      .then(function (allCodeNameElements) {
        console.log("In AllCodeName elements");
        // [ <h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3>  ]
        let allCodeNamesPromise = [];
        for (let i = 0; i < allCodeNameElements.length; i++) {
          let codeNamePromise = tab.evaluate(function (elem) {
            return elem.textContent;
          }, allCodeNameElements[i]);
          allCodeNamesPromise.push(codeNamePromise);
        }
        // allCodeNamesPromise = [  Promise<Pending> , Promise<Pending> , Promise<Pending> ];
        let sbkaPromise = Promise.all(allCodeNamesPromise);
        return sbkaPromise; //Prmose<Pending> => Promise<["C++" , "Python" , "Java"]> 
      })
      .then(function(codeNames){
        console.log(codeNames);
        for(let i=0;i<codeNames.length;i++){
          if(codeNames[i]=='C++'){
            idx=i;
            break;
          }
        }
        let allCodesPromise= tab.$$(".hackdown-content .highlight");
        return allCodesPromise;
      })
      .then(function(allCodeDivs){
        //[ <div></div> , <div></div> , <div></div> ];
        console.log("c++ idx=",idx);
        let codeDiv = allCodeDivs[idx];
        let codePromise = tab.evaluate(function (elem) {
          return elem.textContent;
        }, codeDiv);
        return codePromise;
      })
      .then(function(code){
        // console.log(code);
        gCode=code;
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    })
  }

  function pasteCode(){
    return new Promise(function(resolve, reject){
      // at this point gCode-> contains code
      let clickPromise = tab.click("#tab-1-item-0");
      clickPromise.then(function(){
        let waitAndClickPromise = waitAndClick(".checkbox-input");
        return waitAndClickPromise; 
      })
      .then(function(){
        let typedPromise = tab.type("#input-1",gCode);
        return typedPromise;
      })
      .then(function () {
        let controlKeyDownPromise = tab.keyboard.down("Control");
        return controlKeyDownPromise;
      })
      .then(function () {
        let aKeyPressPromise = tab.keyboard.press("A");
        return aKeyPressPromise;
      })
      .then(function () {
        let xKeyPressPromise = tab.keyboard.press("X");
        return xKeyPressPromise;
      })
      .then(function(){
        let clickedOnCodeBoxPromise = tab.click('.monaco-editor.no-user-select.vs');
        return clickedOnCodeBoxPromise;
      })
      .then(function(){
        let aKeyPressPromise = tab.keyboard.press("A");
        return aKeyPressPromise;
      })
      .then(function () {
        let vKeyPressPromise = tab.keyboard.press("V");
        return vKeyPressPromise;
      })
      .then(function () {
        let controlKeyUpPromise = tab.keyboard.up("Control");
        return controlKeyUpPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    })
  }

  function solveQuestion(qLink){
    return new Promise(function(resolve, reject){
      let clickPromise= tab.goto(qLink);
      clickPromise.then(function(){
        let editorialPromise= waitAndClick('div[data-attr2="Editorial"]');
        console.log("clicked on editorial");
        return editorialPromise;
      })
      // .then(function(){
      //   let acceptEditorialPromise= waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
      //   console.log("clicked on i want to unlock editorial");
      //   return acceptEditorialPromise;
      // })
      .then(function(){
        let codePromise= getCode();
        return codePromise;
      })
      .then(function(){
        let pasteCodePromise=pasteCode();
        return pasteCodePromise;
      })
      .then(function(){
        let clickPromise = tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
        return clickPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    });
  }