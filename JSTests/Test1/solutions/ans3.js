// let values = [1,2,3,4,5,6,7,8];

// [1 , 4 , 9 ,16 , ];

// map
// let modifiedValues = values.map(  function(val){
//     return val*val;
// })
// console.log(modifiedValues);

// filter
// let evenValues = values.filter( function(val){
//     //return true/false and on the basis of true/false, val is pushed onto evenValues
//     if( val % 2 == 0){
//         // val is even
//         return true;
//     }
//     else{
//         // val is odd
//         return false;
//     }
// });

// console.log(evenValues);


// [1,2,3,4,5,6,7,8];
// reduce
// let value = values.reduce( function(total , currentValue){
//      // return single value total after running on whole arr 
//     return total+currentValue;
// });
let a=[
        { name: "Delhi", rainfall: [2.3, 4, 3.1, 5.5, 1.1, 1.2, 7] },
        { name: "Noida", rainfall: [6.3, 0, 0.1, 3.5, 1, 2.6, 0.7] },
        { name: "Dehradun", rainfall: [12, 5.6, 3.1, 0.55, 11, 16.2, 19] },
        { name: "Nanital", rainfall: [8, 1.4, 0.61, 15.5, 6.6, 2, 9.82] },
    ];

function getAvgRainfall(input){
    // map , filter , reduce

    let modifiedInput = input.map( function(inputObj){
        // { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] }
        let obj = {};
        obj.name = inputObj.name;
        let sum = inputObj.rainfall.reduce( function(total , currentValue){
            return total+currentValue;
        });
        let avgRainfall = sum/inputObj.rainfall.length;
        obj.avgRainfall = avgRainfall;
        return obj;
    });
    console.log(modifiedInput);
}
getAvgRainfall(input)


// //my solution
// function getAvg(rain)
// {
//     let sum=0;
//     for(let i in rain)
//         sum+=rain[i];
//     return (sum/rain.length);
// }
// function rainDance(a){
//     let ans=[];
//     for(let i=0;i<a.length;i++){
//         let city=a[i];
//         let cityName=city['name'];
//         let rain=city["rainfall"];
//         let avg=getAvg(rain);
//         let ansObj={"name":cityName,"avgRainfall":avg};
//         ans.push(ansObj);
//     }
//     console.log(ans);
// }
// rainDance(a);