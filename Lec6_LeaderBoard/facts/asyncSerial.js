let fs = require("fs");


// serial order. f1->f2->f3
// disadvantage : callback hell: difficult to understand code if a lot of nesting is there
// solution: promises

fs.readFile("./f1.txt" , function(error , data){
    console.log(data+"");
    fs.readFile("./f2.txt" , function(error , data){
        console.log(data+"");
        fs.readFile("./f3.txt" , function(error , data){
            console.log(data+"");
        })
    })
})