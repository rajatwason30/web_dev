const puppeteer = require("puppeteer");

// opens an instance of chrome and return it in the form of object
let browserOpenPromise = puppeteer.launch({headless: false,});
// Promise<Pending>

browserOpenPromise.then(function (browser) {
    console.log("Browser opened !!!");
    let allPagesPromise = browser.pages();
    return allPagesPromise;
  })
  .then(function (pages) {
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.google.com");
    return pageOpenPromise;
  })
  .then(function () {
    console.log("Opened a new Tab!");
  })