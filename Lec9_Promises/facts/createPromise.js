const fs=require("fs");


function myPromisfiedFunciton(path){
    return new Promise(function(resolve,error){
        //behind the scenes, promises uses sync functions and callbacks
        fs.readFile(path , function(error , data){
            if(error){
                // if file data failed ??
                reject(error); // it will invoke fcb => failure callback
            }
            else{
                // if got file data
                resolve(data); // it will invoke scb => success callback
            }
        })
    })
}

let readPromise=myPromisfiedFunciton("./f1.txt");

readPromise.then(function(data){
    console.log(data+"");
})
readPromise.catch(function(error){
    console.log(error);
})