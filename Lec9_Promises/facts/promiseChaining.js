// facts about promises ->
// promisifed function always gives you a pending promise
// initial state of a promise is pending
// pending promise can only be resolved into states => fullfill(success) or rejected(failure)
// then and catch can only be called on pending promise
// then attaches a succes callback function to the pending promise
// catch attaches a failure callback function to the pending promise

// then and catch also gives us a pending promise known as thenKaPromise
// then and catch are also async functions

// chaining
const fs = require("fs");

// let f1KaPromise = fs.promises.readFile("./f1.txt");
// f1KaPromise.then(function(data){
//     console.log("SCB 1");
// })  //then also returns a promise
// .then(function(){   // again attached a scb to thenKaPromise. this scb is dependent on above promiseKa scb
//     console.log("SCB 2");
// })
// .then(function(){
//     console.log("SCB 3");
// })

// in above example scbs of then are attached to previous then ke promises
// in below example, as we return the Promise, we attach scb to returned promise instead
// In this way chaining is maintained


let f1KaPromise = fs.promises.readFile("./f1.txt");
f1KaPromise.then(function(data){
    console.log(data+"");
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise;
})
.then(function(data){
    console.log(data+"");
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    return f3KaPromise;
})
.then(function(data){
    console.log(data+"");
})

