const fs= require("fs");

let files=['../f1.txt','../f2.txt','../f3.txt'];


// 1st way
// for(let i=0;i<files.length;i++){
//     let fileReadPromise=fs.promises.readFile(files[i]);
//     fileReadPromise.then(function(data){
//         console.log(data+"");
//     })
//     .catch(function(error){
//         console.log(error);
//     })
// }

// 2nd way
let promiseList=[];
for(let i=0;i<files.length;i++){
    let fileReadPromise=fs.promises.readFile(files[i]);
    promiseList.push(fileReadPromise);
}
console.log(promiseList);
let sabkaPromise = Promise.all(promiseList);
sabkaPromise.then(function(data){
    console.log(data+"");
})
.catch(function(error){
    console.log(error);
})