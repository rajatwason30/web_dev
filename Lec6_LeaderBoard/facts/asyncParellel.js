let fs = require("fs");

console.log("start");

// parallel async tasks 
// order of call backs is random
fs.readFile("./f1.txt" , function(error , data){
    console.log(data+"");
})
fs.readFile("./f2.txt" , function(error , data){
    console.log(data+"");
})
fs.readFile("./f3.txt" , function(error , data){
    console.log(data+"");
})


console.log("end");