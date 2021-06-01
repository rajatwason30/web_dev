let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

function serialAsync(files,idx){
    if(idx==files.length)
        return;
    fs.readFile(files[idx],function(error,data){
        console.log(data+"");
        serialAsync(files,idx+1);
    });
}

serialAsync(files,0);