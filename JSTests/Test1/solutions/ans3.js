/* 
    Use INPUT variable to get stdin.
    Try console.log(INPUT);
*/

let a=[
        { name: "Delhi", rainfall: [2.3, 4, 3.1, 5.5, 1.1, 1.2, 7] },
        { name: "Noida", rainfall: [6.3, 0, 0.1, 3.5, 1, 2.6, 0.7] },
        { name: "Dehradun", rainfall: [12, 5.6, 3.1, 0.55, 11, 16.2, 19] },
        { name: "Nanital", rainfall: [8, 1.4, 0.61, 15.5, 6.6, 2, 9.82] },
    ];

function getAvg(rain)
{
    let sum=0;
    for(let i in rain)
        sum+=rain[i];
    return (sum/rain.length);
}
function rainDance(a){
    let ans=[];
    for(let i=0;i<a.length;i++){
        let city=a[i];
        let cityName=city['name'];
        let rain=city["rainfall"];
        let avg=getAvg(rain);
        let ansObj={"name":cityName,"avgRainfall":avg};
        ans.push(ansObj);
    }
    // for(let i=0;i<ans.length;i++){
    //     console.log(ans[i]["name"]);
    //     console.log(ans[i]["avgRainfall"]);        
    // }
    console.log(ans);
}
rainDance(a);