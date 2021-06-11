const puppeteer=require("puppeteer");

let tab;
let id="cosej63635@beydent.com";
let pw="123456789"; 

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
    let loginPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    ); //navigation => page change
    console.log("Succesfully logeed in!")
    return loginPromise;
  })
  .catch(function(error){
      console.log(error);
  })