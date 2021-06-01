// if there are n number of files instead of 3 as done in activity folder
// we can use loop for multiplle/parellell async calls
// loops do not work in case of serial. use recursion

let fs = require("fs");

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt", "../f4.txt","../f5.txt"];


for(let i=0 ; i<files.length ; i++){
    fs.readFile(files[i] , function(error , data){
        console.log(data+"");
    })
}