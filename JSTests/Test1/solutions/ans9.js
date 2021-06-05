let s="not picking";

let splittedStrings=s.split(" ");
//Not allowed as string are immutable
// let t=s[0][0];
// s[0][0]=s[1][0];
// s[1][0]=t;

let ans=splittedStrings[1][0]+splittedStrings[0].slice(1) +" "+splittedStrings[0][0]+splittedStrings[1].slice(1);
console.log(ans);