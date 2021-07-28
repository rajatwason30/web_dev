let fs = require("fs");

// IIFE => Immediately invoked function expressions


// await can be only written in async functions

console.log("start");

// async function doesnt block stack
(async function(){
    try{
        // locally 
        let f1KaData = await fs.promises.readFile("./f1.txt"); ///10 sec
        let f2KaData = await fs.promises.readFile("./f2.txt"); // 20 sec
        console.log(f1KaData+"");
        console.log(f2KaData+"");
        // let sbkaData = await Promise.all( [f1KaPromise , f2KaPromise]);
        // console.log(sbkaData);
    }
    catch(error){
        console.log("inside catch")
        console.log(error);
    }    
})();

console.log("end");