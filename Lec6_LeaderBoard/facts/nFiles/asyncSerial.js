// loops do not work for multiple files

let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

// files read krni => serially => async function

let idx=0;

// wrong solution
// while loop will keep running. execution stack will never be empty. cb function will never be called
// idx never gets incremented => infinite loop
while(idx <files.length){
    fs.readFile(files[idx] , function(error , data){
        console.log(data+"");
        idx++;
    })
}
